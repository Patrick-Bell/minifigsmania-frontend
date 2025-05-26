import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { 
        padding: 30, 
        fontFamily: 'Helvetica',
    },
    header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    text: { fontSize: 12, marginBottom: 3, color: '#333' },
    section: { marginBottom: 20 },
    table: { width: '100%', borderColor: '#e9ebee', marginVertical: 10 },
    row: { flexDirection: 'row', borderBottom: 1, borderColor: '#e9ebee', paddingVertical: 8, alignItems: 'center' },
    headerRow: { backgroundColor: '#f4f4f4', fontWeight: 'bold' },
    cell: { flex: 1, textAlign: 'center', fontSize: 10 },
    image: { width: 40, height: 40, marginRight: 5, borderRadius: 4 },
    footer: { 
        marginTop: 20, 
        paddingTop: 10, 
        borderTop: 1, 
        borderColor: '#e9ebee', 
        position: 'relative', // Relative to content
        textAlign: 'center', 
    },
    bold: { fontWeight: 'bold', color: '#333', marginBottom: 10 },
    companyInfo: { textAlign: 'right', fontSize: 10, color: '#777' },
    tableContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1, 
    },
});

const AdminLowStockReport = ({ lowStockItems }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Received lowStockItems:", lowStockItems);
        setLoading(false);
    }, [lowStockItems]);

    const stockLevel = (stock) => {
        console.log("Calculating stock level for stock:", stock);

        switch (stock) {
            case 3: return { level: 'Low', color: 'yellow' };
            case 2: return { level: 'Very Low', color: 'orange' };
            case 1: return { level: 'Last One', color: 'red' };
            case 0: return { level: 'Out of Stock', color: 'red' };
            default: return { level: 'In Stock', color: 'green' };
        }
    };

    if (loading) return <Text>Loading report...</Text>;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Low Stock Report</Text>
                    <View style={styles.companyInfo}>
                        <Text style={styles.text}>MyCompany Inc.</Text>
                        <Text style={styles.text}>123 Business Road</Text>
                        <Text style={styles.text}>New York, NY 10001</Text>
                    </View>
                </View>

                {/* Product Table */}
                <View style={styles.section}>
                    <Text style={styles.bold}>Products with Low Stock</Text>
                    <View style={styles.table}>
                        <View style={[styles.row, styles.headerRow]}>
                            <Text style={styles.cell}>Product</Text>
                            <Text style={styles.cell}>Stock</Text>
                            <Text style={styles.cell}>Status</Text>
                        </View>

                        {/* Check if lowStockItems exist, then map through the products */}
                        {lowStockItems && lowStockItems.length > 0 ? (
                            <View style={styles.tableContainer}>
                                {lowStockItems.map((product, index) => (
                                    <View key={index} style={styles.row}>
                                        <View style={[styles.cell, { flexDirection: 'row', alignItems: 'center' }]}>
                                            <Image src={product.image} style={styles.image} />
                                            <Text>{product.name}</Text>
                                        </View>
                                        <Text style={styles.cell}>{product.stock}</Text>
                                        <Text style={[styles.cell, { color: stockLevel(product.stock).color }]}>
                                            {stockLevel(product.stock).level}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>No low-stock items.</Text>
                        )}
                    </View>
                </View>

                {/* Report Summary */}
                <View style={styles.section}>
                    <Text style={styles.bold}>Report Summary</Text>
                    <Text style={styles.text}>
                        Total Low Stock Items: {/* Add your total low stock items logic */}
                    </Text>
                   <Text style={styles.text}>
                        Total Out of Stock: {/* Add your total out of stock items logic */}
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.text}>Generated on: {new Date().toLocaleDateString()}</Text>
                    <Text style={styles.text}>For any inquiries, contact support@mycompany.com</Text>
                </View>

            </Page>
        </Document>
    );
};

export default AdminLowStockReport;
