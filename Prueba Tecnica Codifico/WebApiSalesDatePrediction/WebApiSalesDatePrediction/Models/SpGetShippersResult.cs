﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiSalesDatePrediction.Models
{
    public partial class SpGetShippersResult
    {
        public int shipperid { get; set; }
        [StringLength(40)]
        public string companyname { get; set; }
    }
}
