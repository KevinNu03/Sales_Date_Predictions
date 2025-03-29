using WebApiSalesDatePrediction.Models;

namespace WebApiSalesDatePrediction.Services
{
    public class ShippersService
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public ShippersService(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<List<SpGetShippersResult>> GetShippers()
        {
            try
            {
                var listShippers = await this._context.GetProcedures().SpGetShippersAsync();

                return listShippers;
            }
            catch
            {
                throw;
            }
        }
    }
}
