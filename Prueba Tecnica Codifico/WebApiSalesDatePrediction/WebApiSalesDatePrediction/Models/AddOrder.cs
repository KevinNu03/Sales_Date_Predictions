using System.Data.SqlTypes;

namespace WebApiSalesDatePrediction.Models
{
    public class AddOrder
    {
        public int EmpId { get; set; }
        public int ShipperId { get; set; }
        public string? ShipName { get; set; }
        public string? ShipAddress { get; set; }
        public string? ShipCity { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime RequiredDate { get; set; }
        public DateTime ShippedDate { get; set; }
        public decimal Freight { get; set; }
        public string? ShipCountry { get; set; }
        public int ProductId { get; set; }
        public decimal UnitPrice { get; set; }
        public Int16 Qty { get; set; }
        public int Discount { get; set; }
        public int CusId { get; set; }
    }
}
