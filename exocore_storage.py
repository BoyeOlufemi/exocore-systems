"""Atomic, process-safe persistence helpers for the PrepFlow prototype."""

from __future__ import annotations

import csv
import fcntl
import json
import os
import tempfile
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

import pandas as pd


@contextmanager
def _exclusive_lock(target: Path) -> Iterator[None]:
    lock_path = target.with_suffix(target.suffix + ".lock")
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    with lock_path.open("a+", encoding="utf-8") as lock_file:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX)
        try:
            yield
        finally:
            fcntl.flock(lock_file.fileno(), fcntl.LOCK_UN)


def _atomic_json_write(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary_name = tempfile.mkstemp(
        dir=path.parent, prefix=f".{path.name}.", suffix=".tmp"
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as temporary_file:
            json.dump(value, temporary_file, indent=2)
            temporary_file.flush()
            os.fsync(temporary_file.fileno())
        os.replace(temporary_name, path)
    finally:
        if os.path.exists(temporary_name):
            os.unlink(temporary_name)


def append_signal(path: str | Path, signal: dict[str, Any]) -> None:
    target = Path(path)
    with _exclusive_lock(target):
        if target.exists():
            with target.open(encoding="utf-8") as source:
                signals = json.load(source)
            if not isinstance(signals, list):
                raise ValueError("Pending-signal store must contain a JSON list")
        else:
            signals = []
        signals.append(signal)
        _atomic_json_write(target, signals)


def read_signals(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return []
    with _exclusive_lock(target):
        with target.open(encoding="utf-8") as source:
            signals = json.load(source)
    if not isinstance(signals, list):
        raise ValueError("Pending-signal store must contain a JSON list")
    return signals


def deduct_inventory(
    inventory_path: str | Path,
    log_path: str | Path,
    item: str,
    quantity: float,
) -> dict[str, float | str | bool]:
    if not item.strip():
        raise ValueError("Item is required")
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")

    inventory_target = Path(inventory_path)
    log_target = Path(log_path)
    with _exclusive_lock(inventory_target):
        frame = pd.read_csv(inventory_target)
        mask = frame["Item"].astype(str).str.casefold() == item.strip().casefold()
        if not mask.any():
            raise KeyError(f"Ingredient '{item}' not found")

        current_stock = float(frame.loc[mask, "Current_Stock"].iloc[0])
        if quantity > current_stock:
            raise ValueError(
                f"Insufficient stock for '{item}': requested {quantity}, available {current_stock}"
            )

        new_stock = current_stock - quantity
        frame.loc[mask, "Current_Stock"] = new_stock
        fd, temporary_name = tempfile.mkstemp(
            dir=inventory_target.parent,
            prefix=f".{inventory_target.name}.",
            suffix=".tmp",
        )
        os.close(fd)
        try:
            frame.to_csv(temporary_name, index=False)
            os.replace(temporary_name, inventory_target)
        finally:
            if os.path.exists(temporary_name):
                os.unlink(temporary_name)

        log_target.parent.mkdir(parents=True, exist_ok=True)
        log_exists = log_target.exists()
        with log_target.open("a", newline="", encoding="utf-8") as log_file:
            writer = csv.writer(log_file)
            if not log_exists:
                writer.writerow(
                    ["Timestamp", "Actor", "Item", "Quantity", "Previous", "New"]
                )
            writer.writerow(
                [
                    datetime.now(timezone.utc).isoformat(),
                    "MCP Agent",
                    item,
                    quantity,
                    current_stock,
                    new_stock,
                ]
            )

    return {
        "success": True,
        "item": item,
        "previous_stock": current_stock,
        "new_stock": new_stock,
    }
