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
    public class ProductsController : ControllerBase
    {
        private readonly StoreSampleContext _context;
        private readonly IConfiguration _configuration;

        public ProductsController(StoreSampleContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Obtiene la lista de Proudctos
        [HttpGet("GetProducts")]
        [ProducesResponseType(typeof(SpGetProductsResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<ActionResult> GetProducts()
        {
            try
            {
                var productsServices = new ProductsService(_context, _configuration);
                var listCostumers = await productsServices.GetProducts();

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
