export interface Customers{
    custid: number;
    companyname: string;
    orderid: number;
    orderdate: string;
    nextpredictedorder: string;
}

export interface OrderCustomer{
    custid: number;
    orderid: number;
    requireddate: String;
    shippeddate: string;
    shipname: string;
    shipaddress: string;
    shipcity: string;
}

export interface AddOrder{
    empId: number;
    shipperId: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    orderDate: Date | null;
    requiredDate: Date | null;
    shippedDate: Date | null;
    freight: number;
    shipCountry: string;
    productId: number;
    unitPrice: number;
    qty: number;
    discount: number;
    cusId: number;
}