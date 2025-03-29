using WebApiSalesDatePrediction.Models;

namespace WebApiSalesDatePrediction.Services
{
    public class ProductsService
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public ProductsService(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<List<SpGetProductsResult>> GetProducts()
        {
            try
            {
                var listProducts = await this._context.GetProcedures().SpGetProductsAsync();

                return listProducts;
            }
            catch
            {
                throw;
            }
        }
    }
}
