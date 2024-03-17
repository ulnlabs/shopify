type customerAdd = {
    name: string,
    mobile: string,
    email: string,
    gst: string,
    tax: string,
    due: string,
    state: string,
    city: string,
    pincode: string,
    address: string,

}
type contextData = {
    formData: customerAdd,
    setFormData: Dispatch<SetStateAction<customerAdd>>
}
type children = {
    children: React.ReactNode
}
type customerList = {
    cid: string,
    name: string,
    mobile: string,
    paid: number,
    salesdue: string | number,
    returndue: string | number,
    status: string,
    email: string

}
type columnHeader_dataTable={
    accessorKey: string,
    header: string,
}
type tableVeiw={
    column:boolean,
    filter:boolean,
    rows:boolean,
    paginator:boolean,
}
type customerFileFormat={
    id:number,
    coloum:string,
    value:string
}
type supplierColumn={
    accessorKey: string,
    header: string,

}