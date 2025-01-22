import { OrderFull, OrderProducto } from '@/domain';
import { formatNumberId } from '@/lib/formatNumberId';
import { Table } from '@prisma/client';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 20 },
    header: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
    title: { fontSize: 14, marginVertical: 5, borderTop: '1px', borderBottom: '1px', paddingVertical: 5 },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 12,
      marginVertical: 2,
    },
    column: {
      flexGrow: 1,
    },
    quantity: {
      width: '20%',
      textAlign: 'left',
    },
    description: {
      width: '80%',
      textAlign: 'left',
    },
  });
  

interface ComandaProps {
  orderId: string;
  items: OrderFull | null;
  table: Table | null;
}

export const DocumentoPdf = ({ orderId, items, table }: ComandaProps) => (
    <Document>
    <Page style={styles.page} size={{ width: '80mm', height: 'auto' }}>
      <Text style={styles.header}>Ticket #{items?.number && formatNumberId(items.number)}</Text>
      <Text style={styles.header}>Mesa {items?.table.name}</Text>
      <Text style={styles.title}>Cant. Descripción</Text>
      {items?.OrderItem.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Text style={styles.description}>{item.product.name} - {item.sizeName}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
