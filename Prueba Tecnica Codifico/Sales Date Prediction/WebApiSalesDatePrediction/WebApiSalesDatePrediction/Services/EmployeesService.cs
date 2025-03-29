using WebApiSalesDatePrediction.Models;

namespace WebApiSalesDatePrediction.Services
{
    public class EmployeesService
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public EmployeesService(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<List<SpGetEmployeesResult>> GetEmployees()
        {
            try
            {
                var listEmployees = await this._context.GetProcedures().SpGetEmployeesAsync();

                return listEmployees;
            }
            catch
            {
                throw;
            }
        }
    }
}
