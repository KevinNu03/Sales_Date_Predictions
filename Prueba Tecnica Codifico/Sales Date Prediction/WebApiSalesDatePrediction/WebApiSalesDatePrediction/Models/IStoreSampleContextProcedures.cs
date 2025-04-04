﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using WebApiSalesDatePrediction.Models;

namespace WebApiSalesDatePrediction.Models
{
    public partial interface IStoreSampleContextProcedures
    {
        Task<int> SpAddNewOrderAsync(int? empid, int? shipperid, string shipname, string shipaddress, string shipcity, DateTime? orderdate, DateTime? requireddate, DateTime? shippeddate, decimal? freight, string shipcountry, int? productid, decimal? unitprice, short? qty, decimal? discount, int? cusId, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<SpGetClientOrdersResult>> SpGetClientOrdersAsync(int? custId, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<SpGetCustomersOrdersDateResult>> SpGetCustomersOrdersDateAsync(OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<SpGetEmployeesResult>> SpGetEmployeesAsync(OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<SpGetProductsResult>> SpGetProductsAsync(OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<SpGetShippersResult>> SpGetShippersAsync(OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
    }
}
