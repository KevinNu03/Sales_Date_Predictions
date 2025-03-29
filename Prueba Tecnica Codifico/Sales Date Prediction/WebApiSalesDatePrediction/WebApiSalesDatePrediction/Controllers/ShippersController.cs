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
    public class ShippersController : ControllerBase
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public ShippersController(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Obtiene la lista de Transportes
        [HttpGet("GetShippers")]
        [ProducesResponseType(typeof(SpGetShippersResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<ActionResult> GetShippers()
        {
            try
            {
                var shippersServices = new ShippersService(_context, _configuration);
                var listCostumers = await shippersServices.GetShippers();

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
