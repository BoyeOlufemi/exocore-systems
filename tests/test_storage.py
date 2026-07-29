import json
import tempfile
import unittest
from pathlib import Path

import pandas as pd

from exocore_storage import append_signal, deduct_inventory, read_signals


class SignalStorageTests(unittest.TestCase):
    def test_append_signal_preserves_existing_entries(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "pending.json"
            path.write_text(json.dumps([{"id": 1}]), encoding="utf-8")

            append_signal(path, {"id": 2})

            self.assertEqual(read_signals(path), [{"id": 1}, {"id": 2}])

    def test_rejects_non_list_signal_store(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "pending.json"
            path.write_text("{}", encoding="utf-8")

            with self.assertRaises(ValueError):
                append_signal(path, {"id": 1})


class InventoryStorageTests(unittest.TestCase):
    def test_deduct_inventory_records_exact_change(self):
        with tempfile.TemporaryDirectory() as directory:
            inventory = Path(directory) / "inventory.csv"
            log = Path(directory) / "inventory_log.csv"
            pd.DataFrame(
                [{"Item": "Rice", "Current_Stock": 20.0}]
            ).to_csv(inventory, index=False)

            result = deduct_inventory(inventory, log, "rice", 7.5)

            self.assertEqual(result["previous_stock"], 20.0)
            self.assertEqual(result["new_stock"], 12.5)
            saved = pd.read_csv(inventory)
            self.assertEqual(float(saved.loc[0, "Current_Stock"]), 12.5)
            self.assertIn("MCP Agent", log.read_text(encoding="utf-8"))

    def test_insufficient_stock_does_not_mutate_inventory(self):
        with tempfile.TemporaryDirectory() as directory:
            inventory = Path(directory) / "inventory.csv"
            log = Path(directory) / "inventory_log.csv"
            original = "Item,Current_Stock\nRice,5\n"
            inventory.write_text(original, encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "Insufficient stock"):
                deduct_inventory(inventory, log, "Rice", 6)

            self.assertEqual(inventory.read_text(encoding="utf-8"), original)
            self.assertFalse(log.exists())

    def test_rejects_non_positive_quantity(self):
        with tempfile.TemporaryDirectory() as directory:
            inventory = Path(directory) / "inventory.csv"
            inventory.write_text("Item,Current_Stock\nRice,5\n", encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "greater than zero"):
                deduct_inventory(inventory, Path(directory) / "log.csv", "Rice", 0)


if __name__ == "__main__":
    unittest.main()
