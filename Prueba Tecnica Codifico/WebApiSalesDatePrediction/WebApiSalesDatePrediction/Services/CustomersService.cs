using WebApiSalesDatePrediction.Models;

namespace WebApiSalesDatePrediction.Services
{
    public class CustomersService
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public CustomersService(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<List<SpGetCustomersOrdersDateResult>> GetCustomersOrdersDate()
        {
            try
            {
                var listCustomers = await this._context.GetProcedures().SpGetCustomersOrdersDateAsync();

                return listCustomers;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<SpGetClientOrdersResult>> GetClientOrders(int CustId)
        {
            try
            {
                var listCustomers = await this._context.GetProcedures().SpGetClientOrdersAsync(CustId);

                return listCustomers;
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> AddNewOrder(AddOrder Order)
        {
            try
            {
                await this._context.GetProcedures().SpAddNewOrderAsync(Order.EmpId
                                                                        ,Order.ShipperId
                                                                        ,Order.ShipName
                                                                        ,Order.ShipAddress
                                                                        ,Order.ShipCity
                                                                        ,Order.OrderDate
                                                                        ,Order.RequiredDate
                                                                        ,Order.ShippedDate
                                                                        ,Order.Freight
                                                                        ,Order.ShipCountry
                                                                        ,Order.ProductId
                                                                        ,Order.UnitPrice
                                                                        ,Order.Qty
                                                                        ,Order.Discount
                                                                        ,Order.CusId);

                return "Orden Creada Correctamente.";
            }
            catch
            {
                throw;
            }
        }
    }
}
