'use client'

import { useEffect, useState } from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import { height } from 'pdfkit/js/page'

/* =======================
   TYPES
======================= */
interface LoanData {
  _id: string
  fullName: string
  loanAmount: number
  status: string
  loanType: number
  phoneNumber: string
  dateApplied: string
  dueDate: string
}

interface DeletedLoan {
  _id: string
  fullName: string
  loanAmount: number
  status: string
  loanType: number
  phoneNumber: string
  dateApplied: string
  dueDate: string
  deletedAt: string
}

/* =======================
   COMPONENT
======================= */
export default function LoanPDF() {
  const [loans, setLoans] = useState<LoanData[]>([])
  const [repayments, setRepayments] = useState<any[]>([])
  const [deletedLoans, setDeletedLoans] = useState<DeletedLoan[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/pdf')
      const result = await res.json()

      setLoans(result.data.loan)
      setRepayments(result.data.repayments)
      setDeletedLoans(result.data.deletedLoans)
    }

    fetchData()
  }, [])

  if (loans.length === 0) {
    return <div>Loading PDF...</div>
  }

  return (
    <Document>

      {/* =======================
         COVER PAGE
      ======================= */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nyamekye Loans</Text>
          <Text style={styles.headerSub}>
            Comprehensive Loan Report
          </Text>
          <Text style={styles.headerDate}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>
      </Page>

      {/* =======================
         ALL LOANS
      ======================= */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>All Loan Applications</Text>

        {loans.map((loan, index) => (
          <View key={index} style={styles.card}>
            <Info label="Borrower" value={loan.fullName} />
            <Info label="Loan Amount" value={`GHS ${loan.loanAmount}`} />
            <Info label="Status" value={loan.status} />
            <Info label="Interest Type" value={loan.loanType.toString()} />

            <View style={styles.divider} />

            <Info
              label="Date Applied"
              value={new Date(loan.dateApplied).toLocaleDateString()}
            />
            <Info
              label="Due Date"
              value={new Date(loan.dueDate).toLocaleDateString()}
            />
            <Info label="Phone Number" value={loan.phoneNumber} />
          </View>
        ))}

        <Footer />
      </Page>

      {/* =======================
         REPAID LOANS
      ======================= */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Repaid Loans</Text>

        {repayments.length > 0 ? (
          repayments.map((repay, index) => (
            <View key={index} style={styles.card}>
              <Info label="Borrower" value={repay.fullName} />
              <Info label="Amount Repaid" value={`GHS ${repay.amountRepaid}`} />
              <Info
                label="Date Repaid"
                value={new Date(repay.dateRepaid).toLocaleDateString()}
              />
            </View>
          ))
        ) : (
          <Text>No repaid loans available.</Text>
        )}

        <Footer />
      </Page>

      {/* =======================
         DELETED LOANS
      ======================= */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Deleted Loans</Text>

        {deletedLoans.length > 0 ? (
          deletedLoans.map((del, index) => (
            <View key={index} style={styles.card}>
              <Info
                label="Deleted At"
                value={new Date(del.deletedAt).toLocaleDateString()}
              />
              <Info label="Borrower" value={del.fullName} />
              <Info label="Loan Amount" value={`GHS ${del.loanAmount}`} />
              <Info label="Status" value={del.status} />
              <Info label="Interest Type" value={del.loanType.toString()} />

              <View style={styles.divider} />

              <Info
                label="Date Applied"
                value={new Date(del.dateApplied).toLocaleDateString()}
              />
              <Info
                label="Due Date"
                value={new Date(del.dueDate).toLocaleDateString()}
              />
              <Info label="Phone Number" value={del.phoneNumber} />
            </View>
          ))
        ) : (
          <Text>No deleted loans found.</Text>
        )}

        <Footer />
      </Page>

    </Document>
  )
}

/* =======================
   REUSABLE COMPONENTS
======================= */
const Info = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginBottom: 6 }}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const Footer = () => (
  <Text
    style={styles.footer}
    render={({ pageNumber, totalPages }) =>
      `Page ${pageNumber} of ${totalPages}`
    }
  />
)

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F4F6F8',
    padding: 24,
    fontSize: 11,
  },

  header: {
    backgroundColor: '#0F172A',
    padding: 24,
    borderRadius: 8,
    marginTop: 200,
   
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
     height: '50%',
  },

  headerSub: {
    color: '#CBD5E1',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },

  headerDate: {
    color: '#94A3B8',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#0F172A',
    textTransform: 'uppercase',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },

  label: {
    fontSize: 9,
    color: '#64748B',
  },

  value: {
    fontSize: 11,
    color: '#0F172A',
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 9,
    color: '#64748B',
  },
})
