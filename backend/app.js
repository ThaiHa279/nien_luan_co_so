//sk_test_51MrXePK68tOaceDgiOG8RuBxyM4gBSS3lbppIOe00cTKVRlSqrNmXxhtcA6buVmMTFNNYh6u513O4K7afmHneJaO00xWaOYoJW
//price_1MrXhwK68tOaceDgTe4V0giE
const express = require('express');
const cors = require("cors");
const config = require("~/config");
const app = express();
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const Connect = require('connect-pg-simple')
const session = require('express-session')
const AdminJSSequelize = require('@adminjs/sequelize')
const sequelize = require("~/services/sequelize.service")
const PORT = 3000
const stripe = require('stripe')("sk_test_51MrXePK68tOaceDgiOG8RuBxyM4gBSS3lbppIOe00cTKVRlSqrNmXxhtcA6buVmMTFNNYh6u513O4K7afmHneJaO00xWaOYoJW")
const material = require('~/models/material.model')
const material_details = require('~/models/material_detail.model')
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}
AdminJS.registerAdapter({
	Resource: AdminJSSequelize.Resource,
	Database: AdminJSSequelize.Database,
})
const authenticate = async (email, password) => {
	if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
	  return Promise.resolve(DEFAULT_ADMIN)
	}
	return null
  }

app.use(express.json());
app.use(
	cors({
		origin: config.fontend.origin,
		optionsSuccessStatus: 200,
	})
);
app.use("/api/v1", require("~/routes"));
const admin = new AdminJS({
	databases: [sequelize],
  resources: [{
    resource: material,
    options: {
      properties: {
        description: {
          isVisible: {
            edit: true,
            show: true,
            list: false,
            filter: false,
          },
        },
      },
    },
  },],
})

const ConnectSession = Connect(session)
const sessionStore = new ConnectSession({
  conObject: {
	connectionString: 'postgres://root:root@localhost:5432/adminjs',
	ssl: process.env.NODE_ENV === 'production',
  },
  tableName: 'session',
  createTableIfMissing: true,
})

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret',
  },
  null,
  {
	store: sessionStore,
	resave: true,
	saveUninitialized: true,
	secret: 'sessionsecret',
	cookie: {
	  httpOnly: process.env.NODE_ENV === 'production',
	  secure: process.env.NODE_ENV === 'production',
	},
	name: 'adminjs',
  }
)

app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.code,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3001/success",
        cancel_url: "http://localhost:3001/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});
app.use(admin.options.rootPath, adminRouter)
app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
})



module.exports = app;