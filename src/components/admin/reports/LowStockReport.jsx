import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../assets/logo.png'

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
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  reportMeta: {
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
    width: '49%',
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
  table: {
    marginTop: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#212B36',
  },
  productCol: { width: '40%' },
  skuCol: { width: '15%' },
  stockCol: { width: '15%', textAlign: 'center' },
  statusCol: { width: '15%', textAlign: 'center' },
  actionCol: { width: '15%', textAlign: 'right' },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F8',
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  productName: {
    fontSize: 10,
    color: '#212B36',
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 9,
    color: '#637381',
    marginTop: 2,
  },
  skuText: {
    fontSize: 10,
    color: '#637381',
  },
  stockText: {
    fontSize: 10,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 9,
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 10,
    color: '#2C6ECB',
    textAlign: 'right',
  },
  summarySection: {
    marginTop: 30,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  summaryLabel: {
    width: '70%',
    fontSize: 10,
    color: '#637381',
  },
  summaryValue: {
    width: '30%',
    fontSize: 10,
    color: '#212B36',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  noteBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 4,
    marginTop: 30,
  },
  noteText: {
    fontSize: 9,
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

// PDF Document Component
const LowStockReport = ({ lowStockItems }) => {
  // Format the current date
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to determine stock status and color
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: '#DE3618', backgroundColor: '#FFF4F4' };
    if (quantity === 1) return { text: 'Last One', color: '#D44A1E', backgroundColor: '#FFF5EB' };
    if (quantity <= 3) return { text: 'Very Low', color: '#B95C00', backgroundColor: '#FFFBEB' };
    if (quantity <= 5) return { text: 'Low', color: '#7E5E00', backgroundColor: '#FCFAEB' };
    return { text: 'Good', color: '#108043', backgroundColor: '#F1F8F5' };
  };

  // Count items by status
  const statusCounts = lowStockItems.reduce((acc, item) => {
    const status = getStockStatus(item.quantity).text;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={Logo} style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>Low Stock Report</Text>
            <Text style={styles.reportMeta}>Generated on: {formatDate()}</Text>
            <Text style={styles.reportMeta}>Store: MinifigsMania</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Info Section */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.blockTitle}>Report Summary</Text>
            <Text style={styles.blockText}>This report shows all inventory items with 5 or fewer units in stock, requiring your attention for restocking.</Text>
            <Text style={styles.blockText}>Total Items Flagged: {lowStockItems.length}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.blockTitle}>Recommended Actions</Text>
            <Text style={styles.blockText}>• Review items marked "Out of Stock" immediately</Text>
            <Text style={styles.blockText}>• Place orders for "Very Low" items within 48 hours</Text>
            <Text style={styles.blockText}>• Plan restocking for "Low" items within 7 days</Text>
          </View>
        </View>

        {/* Products Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.productCol]}>Product</Text>
            <Text style={[styles.tableHeaderText, styles.skuCol]}>ID</Text>
            <Text style={[styles.tableHeaderText, styles.stockCol]}>In Stock</Text>
            <Text style={[styles.tableHeaderText, styles.statusCol]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.actionCol]}>Reorder Qty</Text>
          </View>

          {lowStockItems.map((item) => {
            const status = getStockStatus(item.stock);
            return (
              <View key={item.id} style={styles.tableRow}>
                <View style={styles.productCol}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productCategory}>{item.category}</Text>
                </View>
                <Text style={[styles.skuText, styles.skuCol]}>{item.id}</Text>
                <Text style={[styles.stockText, styles.stockCol]}>{item.stock}</Text>
                <View style={styles.statusCol}>
                  <Text 
                    style={[
                      styles.statusText, 
                      { 
                        color: status.color,
                        backgroundColor: status.backgroundColor
                      }
                    ]}
                  >
                    {status.text}
                  </Text>
                </View>
                <Text style={[styles.actionText, styles.actionCol]}><a>Click here</a></Text>
              </View>
            );
          })}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Stock Status Summary</Text>
          
          {Object.entries(statusCounts).map(([status, count]) => (
            <View key={status} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items with status "{status}"</Text>
              <Text style={styles.summaryValue}>{count}</Text>
            </View>
          ))}
        </View>

        {/* Notes Section */}
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            This report was automatically generated by your inventory management system. 
            Please review and take appropriate action for each flagged item. For any questions, 
            contact your system administrator or inventory manager.
          </Text>
        </View>

        <Text style={styles.pageNumber}>Page 1 of 1</Text>
      </Page>
    </Document>
  );
};

export default LowStockReport;