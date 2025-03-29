﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using DalSalesDatePrediction.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace DalSalesDatePrediction.Models
{
    public partial class StoreSampleContext
    {
        private IStoreSampleContextProcedures _procedures;

        public virtual IStoreSampleContextProcedures Procedures
        {
            get
            {
                if (_procedures is null) _procedures = new StoreSampleContextProcedures(this);
                return _procedures;
            }
            set
            {
                _procedures = value;
            }
        }

        public IStoreSampleContextProcedures GetProcedures()
        {
            return Procedures;
        }
    }

    public partial class StoreSampleContextProcedures : IStoreSampleContextProcedures
    {
        private readonly StoreSampleContext _context;

        public StoreSampleContextProcedures(StoreSampleContext context)
        {
            _context = context;
        }

        public virtual async Task<List<SpGetCustomersOrdersDateResult>> SpGetCustomersOrdersDateAsync(OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default)
        {
            var parameterreturnValue = new SqlParameter
            {
                ParameterName = "returnValue",
                Direction = System.Data.ParameterDirection.Output,
                SqlDbType = System.Data.SqlDbType.Int,
            };

            var sqlParameters = new []
            {
                parameterreturnValue,
            };
            var _ = await _context.SqlQueryAsync<SpGetCustomersOrdersDateResult>("EXEC @returnValue = [Sales].[SpGetCustomersOrdersDate]", sqlParameters, cancellationToken);

            returnValue?.SetValue(parameterreturnValue.Value);

            return _;
        }
    }
}
