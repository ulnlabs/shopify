type customerAdd = {
  name: string;
  mobile: string;
  email: string;
  _id?: string
  state: string;
  city: string;
  pincode: string;
  address: string;
  id:number
};
type contextData = {
  formData: customerAdd;
  setFormData: Dispatch<SetStateAction<customerAdd>>;
};
type children = {
  children: React.ReactNode;
};
type customerList = {
  cid: string;
  name: string;
  mobile: string;
  paid: number;
  salesdue: string | number;
  returndue: string | number;
  status: string;
  email: string;
  _id: string;
};
type columnHeader_dataTable = {
  accessorKey: string;
  header: string;
};
type tableVeiw = {
  column: boolean;
  filter: boolean;
  rows: boolean;
  paginator: boolean;
};
type customerFileFormat = {
  id: number;
  coloum: string;
  value: string;
};
type supplierColumn = {
  accessorKey: string;
  header: string;
};
export interface FormState {
  customerName: string,
  customerId:number,
  billDate: Date ,
  billStatus?: string,
  billQuantity: number,
  billCharges: any,
  billTaxType: string,
  billDiscount: any,
  billDiscountType: string,
  billNote: string,
  billSubtotal: number,
  billOtherCharge: number,
  billOverallDis: number
  billTotal: number,
  billPaymentType: string,
  billAmount: any,


}