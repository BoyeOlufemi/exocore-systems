from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
ORDER_FORM = ROOT / "siblings" / "prepflow-os" / "order_form.html"


class OrderFormSecurityTests(unittest.TestCase):
    def test_static_form_does_not_transmit_contact_data(self):
        source = ORDER_FORM.read_text(encoding="utf-8")

        self.assertNotIn("ngrok-free.dev", source)
        self.assertNotIn("fetch(", source)
        self.assertIn("authenticated server-side intake", source)
        self.assertIn("type=\"submit\" disabled", source)


if __name__ == "__main__":
    unittest.main()
