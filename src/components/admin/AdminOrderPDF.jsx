import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';


const AdminOrderPDF = ({ order }) => {

    const styles = StyleSheet.create({
        page: { padding: 30, fontFamily: 'Helvetica' },
        header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
        title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
        text: { fontSize: 12, marginBottom: 3, color: '#333' },
        section: { marginBottom: 20 },
        table: { width: '100%', borderColor:'#e9ebee', marginVertical: 10 },
        row: { flexDirection: 'row', borderBottom: 1, borderColor:'#e9ebee', paddingVertical: 8, alignItems: 'center' },
        headerRow: { backgroundColor: '#f4f4f4', fontWeight: 'bold' },
        cell: { flex: 1, textAlign: 'center', fontSize: 10 },
        image: { width: 40, height: 40, marginRight: 5, borderRadius: 4 },
        footer: { marginTop: 20, paddingTop: 10, borderTop: 1, borderColor:'#e9ebee' },
        bold: { fontWeight: 'bold', color: '#333', marginBottom: 10 },
        companyInfo: { textAlign: 'right', fontSize: 10, color: '#777' }
      });
      

    return (

        <>

<Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <View style={styles.companyInfo}>
          <Text style={styles.text}>MyCompany Inc.</Text>
          <Text style={styles.text}>123 Business Road</Text>
          <Text style={styles.text}>New York, NY 10001</Text>
        </View>
      </View>

      {/* Customer Details */}
      <View style={styles.section}>
        <Text style={styles.bold}>Bill To:</Text>
        <Text style={styles.text}>John Doe</Text>
        <Text style={styles.text}>{order.address}</Text>
        <Text style={styles.text}>johndoe@example.com</Text>
      </View>

      {/* Order Details */}
      <View style={styles.section}>
        <Text style={styles.bold}>Order Information</Text>
        <Text style={styles.text}>Order ID: {order.id}</Text>
        <Text style={styles.text}>Date: {new Date(order.date).toLocaleDateString()}</Text>
      </View>

      {/* Product Table */}
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.cell}>Product</Text>
          <Text style={styles.cell}>Price</Text>
          <Text style={styles.cell}>Quantity</Text>
          <Text style={styles.cell}>Total</Text>
        </View>
        {order?.line_items?.map((product, index) => (
          <View key={index} style={styles.row}>
            <View style={[styles.cell, { flexDirection: 'row', alignItems: 'center' }]}>
              <Image src={product.image} style={styles.image} />
              <Text>{product.name}</Text>
            </View>
            <Text style={styles.cell}>£{product.price.toFixed(2)}</Text>
            <Text style={styles.cell}>{product.quantity}</Text>
            <Text style={styles.cell}>£{(product.price * product.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.bold}>Invoice Summary</Text>
        <Text style={styles.text}>
 		 Subtotal: £{ (parseFloat(order.total_price) - parseFloat(order.shipping_fee)).toFixed(2) }
		</Text>
        <Text style={styles.text}>Shipping Fee: £{order.shipping_fee}</Text>
        <Text style={[styles.text, styles.bold]}>
  		Total Amount: £{parseFloat(order.total_price).toFixed(2)}
        </Text>
      </View>


      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.text}>Thank you for your business!</Text>
        <Text style={styles.text}>For any inquiries, contact support@mycompany.com</Text>
      </View>

    </Page>
  </Document>
        
        </>
    )
}

export default AdminOrderPDF