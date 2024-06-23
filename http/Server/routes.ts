import {bootstrap as app} from "@server/bootstrap";

import * as Routes from "@routes/index";

const apiVersion = "api/v1";

app.use(`/${apiVersion}/auth`, Routes.AuthRouter);
app.use(`/${apiVersion}/merchantAuth`, Routes.MerchantAuthRouter);

app.use(`/${apiVersion}/admin`, Routes.AdminRouter);
app.use(`/${apiVersion}/category`, Routes.CategoryRouter);
app.use(`/${apiVersion}/subCategory`, Routes.SubCategoryRouter);
app.use(`/${apiVersion}/product`, Routes.ProductRouter);
app.use(`/${apiVersion}/variant`, Routes.VariantRouter);
app.use(`/${apiVersion}/merchant`, Routes.MerchantRouter);
app.use(`/${apiVersion}/merchantProduct`, Routes.MerchantProductRouter);
