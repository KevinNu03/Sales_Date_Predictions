using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiSalesDatePrediction.Models;
using WebApiSalesDatePrediction.Services;

namespace WebApiSalesDatePrediction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public EmployeesController(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Obtiene la lista de empleados
        [HttpGet("GetEmployees")]
        [ProducesResponseType(typeof(SpGetEmployeesResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<ActionResult> GetEmployees()
        {
            try
            {
                var employeesServices = new EmployeesService(_context, _configuration);
                var listCostumers = await employeesServices.GetEmployees();

                return Ok(listCostumers);
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }
    }
}
