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
    public class CustomersController : Controller
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public CustomersController(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Obtiene la lista de clientes con su fecha de order y prediccion de fecha proxima orden
        [HttpGet("GetCustomersOrdersDate")]
        [ProducesResponseType(typeof(SpGetCustomersOrdersDateResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<ActionResult> GetCustomersOrdersDate()
        {
            try
            {
                var customerServices = new CustomersService(_context, _configuration);
                var listCostumers = await customerServices.GetCustomersOrdersDate();

                return Ok(listCostumers);
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex); 
                return BadRequest(responseHttp);
            }
        }

        //Obtiene la lista de clientes por orden
        [HttpGet("GetClientOrders/{CustId}")]
        [ProducesResponseType(typeof(SpGetClientOrdersResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<ActionResult> GetClientOrders(int CustId)
        {
            try
            {
                var customerServices = new CustomersService(_context, _configuration);
                var listCostumers = await customerServices.GetClientOrders(CustId);

                return Ok(listCostumers);
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }

        ////Se agrega nuevas ordenes para el cliente
        [HttpPost("AddNewOrder")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<ActionResult> AddNewOrder([FromBody]AddOrder Order)
        {
            try
            {
                var customerServices = new CustomersService(_context, _configuration);
                var Response = await customerServices.AddNewOrder(Order);

                if (Response == null)
                {
                    return Ok(new { message = "Orden creada correctamente, pero sin datos adicionales" });
                }

                return Ok(new { message = "Orden creada correctamente", data = Response });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }
    }
}
