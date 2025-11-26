import React, { forwardRef } from 'react';

const InvoicePrint = forwardRef(({ invoice, store }, ref) => {
  if (!invoice) return null;

  const format = (n) => Number(n).toFixed(2);

  return (
    <div
      ref={ref}
      id="invoice-print"
      style={{
        width: 320,
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        fontSize: 12,
        lineHeight: 1.2,
        color: "#000",
      }}
    >
      <div style={{ textAlign: "center", paddingBottom: 6 }}>
        {store?.logo_path && (
          <img
            src={store.logo_path}
            alt="logo"
            style={{ maxWidth: 120, display: "block", margin: "0 auto 6px" }}
          />
        )}
        <div style={{ fontWeight: 700, fontSize: 14 }}>
          {store?.store_name || "ADMemsaab"}
        </div>
        {store?.address && <div style={{ fontSize: 11 }}>{store.address}</div>}
        {store?.phone && <div style={{ fontSize: 11 }}>{"Ph: " + store.phone}</div>}
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Invoice</div>
        <div>{invoice.invoice_no}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Date</div>
        <div>{new Date(invoice.date).toLocaleString()}</div>
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      <table style={{ width: "100%", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Item</th>
            <th style={{ textAlign: "center", width: 30 }}>Qty</th>
            <th style={{ textAlign: "right", width: 60 }}>Price</th>
            <th style={{ textAlign: "right", width: 70 }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((it, idx) => (
            <tr key={idx}>
              <td style={{ textAlign: "left" }}>{it.name}</td>
              <td style={{ textAlign: "center" }}>{it.qty}</td>
              <td style={{ textAlign: "right" }}>₹{format(it.price)}</td>
              <td style={{ textAlign: "right" }}>
                ₹{format(it.price * it.qty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Subtotal</div>
        <div>₹{format(invoice.subtotal)}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Tax</div>
        <div>₹{format(invoice.tax)}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 700,
        }}
      >
        <div>Total</div>
        <div>₹{format(invoice.total)}</div>
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />
      <div style={{ textAlign: "center", fontSize: 11 }}>
        Thank you for your business!
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
});

export default InvoicePrint;
