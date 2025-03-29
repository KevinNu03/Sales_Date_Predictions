USE [StoreSample]

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <28/03/2025>
-- Description:	<Se crea Sp para que tome la data de los clientes>
-- =============================================
--Historico
--Version	Author			FechaModificacion	Descripción
--V1		Kevin Nuñez		28/03/2025			Creacion del SP
-- =============================================
CREATE OR ALTER PROCEDURE Sales.SpGetCustomersOrdersDate
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	WITH OrdenesConDiferencia AS (
		SELECT 
			O.custid,
			O.orderid,
			O.orderdate,
			LAG(O.orderdate) OVER (PARTITION BY O.custid ORDER BY O.orderdate) AS FechaAnterior,
			DATEDIFF(DAY, LAG(O.orderdate) OVER (PARTITION BY O.custid ORDER BY O.orderdate), O.orderdate) AS DiasEntreOrdenes
		FROM Sales.Orders O
	)
	, PromedioDias AS (
		SELECT 
			custid,
			AVG(DiasEntreOrdenes) AS PromedioDiasEntreOrdenes
		FROM OrdenesConDiferencia
		WHERE DiasEntreOrdenes IS NOT NULL
		GROUP BY custid
	)
	SELECT
		C.custid,
		C.companyname,
		O.orderid,
		FORMAT(O.orderdate, 'dd/MM/yyyy') AS orderdate,
		FORMAT(DATEADD(DAY,PD.PromedioDiasEntreOrdenes,O.orderdate), 'dd/MM/yyyy') AS nextpredictedorder
	FROM Sales.Customers C
	LEFT JOIN (
		SELECT 
			O.custid,
			MAX(O.orderid) AS orderid
		FROM Sales.Orders O
		GROUP BY O.custid
	) AS OM ON OM.custid = C.custid
	LEFT JOIN Sales.Orders O ON O.orderid = OM.orderid
	LEFT JOIN PromedioDias PD ON C.custid = PD.custid
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <28/03/2025>
-- Description:	<Se crea Sp para que tome la data de las ordenes por cliente>
-- =============================================
--Historico
--Version	Author			FechaModificacion	Descripción
--V1		Kevin Nuñez		28/03/2025			Creacion del SP
-- =============================================
CREATE OR ALTER PROCEDURE Sales.SpGetClientOrders
	-- Add the parameters for the stored procedure here
	@CustId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
		C.custid
		,O.orderid
		,FORMAT(O.requireddate, 'dd/MM/yyyy') AS requireddate
		,FORMAT(O.shippeddate, 'dd/MM/yyyy') AS shippeddate
		,O.shipname
		,O.shipaddress
		,O.shipcity
	FROM 
		Sales.Customers C
		INNER JOIN Sales.Orders O ON C.custid = O.custid
	WHERE
		C.custid = @CustId
END
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <28/03/2025>
-- Description:	<Se crea Sp para que tome la data de los empleados>
-- =============================================
--Historico
--Version	Author			FechaModificacion	Descripción
--V1		Kevin Nuñez		28/03/2025			Creacion del SP
-- =============================================
CREATE OR ALTER PROCEDURE HR.SpGetEmployees
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
		E.empid
		,CONCAT(firstname, ' ', lastname) AS FullName
	FROM 
		HR.Employees E
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <28/03/2025>
-- Description:	<Se crea Sp para que tome la data de los transportes>
-- =============================================
--Historico
--Version	Author			FechaModificacion	Descripción
--V1		Kevin Nuñez		28/03/2025			Creacion del SP
-- =============================================
CREATE OR ALTER PROCEDURE Sales.SpGetShippers
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
		S.shipperid
		,S.companyname
	FROM 
		Sales.Shippers S
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <28/03/2025>
-- Description:	<Se crea Sp para que tome la data de los productos>
-- =============================================
--Historico
--Version	Author			FechaModificacion	Descripción
--V1		Kevin Nuñez		28/03/2025			Creacion del SP
-- =============================================
CREATE OR ALTER PROCEDURE Production.SpGetProducts
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
		P.productid
		,P.productname
	FROM 
		Production.Products P
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <28/03/2025>
-- Description:	<Se crea Sp para que agregue las nuevas ordenes>
-- =============================================
--Historico
--Version	Author			FechaModificacion	Descripción
--V1		Kevin Nuñez		28/03/2025			Creacion del SP
-- =============================================
CREATE OR ALTER PROCEDURE Sales.SpAddNewOrder
	-- Add the parameters for the stored procedure here
	@Empid INT
	,@Shipperid INT
	,@Shipname NVARCHAR(80)
	,@Shipaddress NVARCHAR(120)
	,@Shipcity NVARCHAR(30)
	,@Orderdate DATETIME
	,@Requireddate DATETIME
	,@Shippeddate DATETIME
	,@Freight MONEY
	,@Shipcountry NVARCHAR(30)
	,@Productid INT
	,@Unitprice MONEY
	,@Qty SMALLINT
	,@Discount NUMERIC(4,3)
	,@CusId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Orderid INT 

	BEGIN TRANSACTION;

	BEGIN TRY 
		
		INSERT INTO Sales.Orders(empid, shipperid, shipname, shipaddress, shipcity, orderdate, requireddate, shippeddate, freight, shipcountry, custid)
		VALUES (@Empid, @Shipperid, @Shipname, @Shipaddress, @Shipcity, @Orderdate, @Requireddate, @Shippeddate, @Freight, @Shipcountry, @CusId)

		SET @Orderid = SCOPE_IDENTITY();

		INSERT INTO Sales.OrderDetails (orderid, productid, unitprice, qty, discount)
		VALUES (@Orderid, @Productid, @Unitprice, @Qty, @Discount)

		COMMIT TRANSACTION;

	END TRY

	BEGIN CATCH
		
		ROLLBACK TRANSACTION;
			
	END CATCH
END
GO