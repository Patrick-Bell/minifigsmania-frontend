import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../assets/logo.png';

// Shopify-like Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#212B36',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  logo: {
    width: '25%',
    height: 'auto',
    border: '1px solid #E0E0E0',
    objectFit: 'contain',
    borderRadius: 4,
  },
  headerRight: {
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  invoiceMeta: {
    fontSize: 10,
    color: '#637381',
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoBlock: {
    width: '32%',
  },
  blockTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#212B36',
  },
  blockText: {
    fontSize: 10,
    color: '#637381',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  blockTextBold: {
    fontWeight: 'bold',
    color: '#212B36',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 6,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#212B36',
  },
  productCol: { width: '50%', paddingRight: 6 },
  qtyCol: { width: '10%', textAlign: 'center' },
  priceCol: { width: '20%', textAlign: 'right' },
  totalCol: { width: '20%', textAlign: 'right' },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F8',
    paddingVertical: 8,
    alignItems: 'center',
  },
  productName: {
    fontSize: 10,
    color: '#212B36',
  },
  productID: {
    fontSize: 10,
    color: '#637381',
  },
  totalsSection: {
    alignSelf: 'flex-end',
    width: '45%',
    marginTop: 25,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 10,
    color: '#637381',
  },
  totalValue: {
    fontSize: 10,
    color: '#212B36',
  },
  totalBoldRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 5,
    paddingTop: 8,
  },
  totalBoldText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#212B36',
  },
  noteBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 4,
    marginTop: 30,
  },
  noteText: {
    fontSize: 9,
    textAlign: 'center',
    color: '#212B36',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 9,
    textAlign: 'center',
    color: '#637381',
  },
});

const CurrentMonthOrder = ({ orders }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  return (
    <Document>
         <Page size="A4" style={styles.page}>
    <View style={{ alignItems: 'center', marginTop: 100 }}>
      <Image src={Logo} style={{ width: 120, height: 120, marginBottom: 30 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#212B36', marginBottom: 10 }}>
        Monthly Order Report
      </Text>
      <Text style={{ fontSize: 14, color: '#637381' }}>
        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Text>
    </View>

    <View style={styles.pageNumber}>
      <Text style={styles.pageNumber}>Monthly Order Report</Text>
    </View>
  </Page>

  
      {orders.map((order, index) => {
        const subtotal = order.line_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = subtotal + order.shipping_fee - (order.discount || 0) + (order.tax || 0);

        return (
          <Page size="A4" style={styles.page} key={order.order_id || index}>
            {/* Header */}
            <View style={styles.header}>
              <Image src={Logo} style={styles.logo} />
              <View style={styles.headerRight}>
                <Text style={styles.invoiceTitle}>Invoice</Text>
                <Text style={styles.invoiceMeta}>Order #{order.order_id}</Text>
                <Text style={styles.invoiceMeta}>Order Date: {formatDate(order.created_at)}</Text>
              </View>
            </View>

            <View style={styles.sectionDivider} />

            {/* Info */}
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <Text style={styles.blockTitle}>Bill To</Text>
                <Text style={[styles.blockText, styles.blockTextBold]}>{order.name}</Text>
                <Text style={styles.blockText}>{order.address}</Text>
                <Text style={styles.blockText}>{order.city}, {order.state} {order.postal_code}</Text>
                <Text style={styles.blockText}>{order.country}</Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.blockTitle}>Ship To</Text>
                <Text style={[styles.blockText, styles.blockTextBold]}>{order.name}</Text>
                <Text style={styles.blockText}>{order.address}</Text>
                <Text style={styles.blockText}>{order.city}, {order.state} {order.postal_code}</Text>
                <Text style={styles.blockText}>{order.country}</Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.blockTitle}>Payment</Text>
                <Text style={styles.blockText}>{order.payment_method}</Text>
                <Text style={[styles.blockText, { color: order.paid ? '#108043' : '#DE3618', fontWeight: 'bold' }]}>
                  {order.paid ? 'Paid' : 'Unpaid'}
                </Text>
                <Text style={styles.blockText}>Txn ID: {order.transaction_id || 'N/A'}</Text>
              </View>
            </View>

            {/* Product Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.productCol]}>Product</Text>
                <Text style={[styles.tableHeaderText, styles.qtyCol]}>Qty</Text>
                <Text style={[styles.tableHeaderText, styles.priceCol]}>Price</Text>
                <Text style={[styles.tableHeaderText, styles.totalCol]}>Total</Text>
              </View>
              {order.line_items.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <View style={styles.productCol}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productID}>ID: {item.id}</Text>
                  </View>
                  <Text style={styles.qtyCol}>{item.quantity}</Text>
                  <Text style={styles.priceCol}>{formatCurrency(item.price)}</Text>
                  <Text style={styles.totalCol}>{formatCurrency(item.price * item.quantity)}</Text>
                </View>
              ))}
            </View>

            {/* Totals */}
            <View style={styles.totalsSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping</Text>
                <Text style={styles.totalValue}>{formatCurrency(order.shipping_fee)}</Text>
              </View>
              {order.tax > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tax</Text>
                  <Text style={styles.totalValue}>{formatCurrency(order.tax)}</Text>
                </View>
              )}
              {order.discount > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount</Text>
                  <Text style={styles.totalValue}>-{formatCurrency(order.discount)}</Text>
                </View>
              )}
              <View style={[styles.totalRow, styles.totalBoldRow]}>
                <Text style={styles.totalBoldText}>Total</Text>
                <Text style={styles.totalBoldText}>{formatCurrency(total)}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>
                This is an order summary for order {order?.id} that was created on {formatDate(order?.created_at)}.
              </Text>
            </View>

            <Text style={styles.pageNumber}>Page {index + 1} of {orders.length}</Text>
          </Page>
        );
      })}
    </Document>
  );
};

export default CurrentMonthOrder;
