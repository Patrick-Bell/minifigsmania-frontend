import { PDFDownloadLink } from '@react-pdf/renderer';
import AdminOrderPDF from './AdminOrderPDF';



const AdminDownloadPDF = () => (
  <PDFDownloadLink document={<AdminOrderPDF order={order} />} fileName="invoice.pdf">
  </PDFDownloadLink>
);

export default AdminDownloadPDF;
