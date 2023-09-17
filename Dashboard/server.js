const express = require('express');
const axios = require('axios');
const app = express();
const ejs = require('ejs');
const path = require(`path`);
const passport = require(`passport`);
const Strategy = require(`passport-discord`).Strategy;
const session = require(`express-session`);
const MemoryStore = require(`memorystore`)(session);
const url = require(`url`);
const { PermissionsBitField } = require("discord.js");

module.exports = async client => {
    if (client.con.Dashboard.enabled == true) {
        const port = await client.con.Dashboard.port;

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((obj, done) => done(null, obj));
        passport.use(new Strategy({
            clientID: client.con.clientID,
            clientSecret: client.con.clientSecret,
            callbackURL: client.con.Dashboard.callback,
            scope: [`identify`, `guilds`]
        },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick(() => done(null, profile));
            }));

        app.use(require('cookie-parser')());
        app.use(require('body-parser').urlencoded({ extended: true }));

        app.use(session({
            store: new MemoryStore({ checkPeriod: 86400000 }),
            secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
            resave: false,
            saveUninitialized: true,
        }));


        // initialize passport middleware.
        app.use(passport.initialize());
        app.use(passport.session());


        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));



        const checkAuth = (req, res, next) => {
            if (req.isAuthenticated()) return next();
            req.session.backURL = req.url;
            res.redirect("/login");
        };


        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, './views'))

        app.use(express.static(path.join(__dirname, './public')));
        app.use(express.static(path.join(__dirname, '/'), { dotfiles: 'allow' }));


        app.get(`/login`, (req, res, next) => {
            if (req.session.backURL) {
                req.session.backURL = req.session.backURL;
            } else if (req.headers.referer) {
                const parsed = url.parse(req.headers.referer);
                if (parsed.hostname === app.locals.domain) {
                    req.session.backURL = parsed.path;
                }
            } else {
                req.session.backURL = `/`;
            }
            next();
        }, passport.authenticate(`discord`, { prompt: `none` })
        );

        //Callback endpoint for the login data
        app.get(`/callback`, passport.authenticate(`discord`, { failureRedirect: "/", }), async (req, res) => {
            let banned = false // req.user.id
            if (banned) {
                req.session.destroy(() => {
                    res.json({ login: false, message: `You have been blocked from the Dashboard.`, logout: true })
                    req.logout();
                });
            } else {
                res.redirect(`/dashboard`)
                return;
            }
        });

        app.get('/', (req, res) => {
            res.render('home', {
                botClient: client,
                user: req.isAuthenticated() ? req.user : null,
                callback: client.con.Dashboard.callback,
                Permissions: PermissionsBitField,
            });
        });

        app.get('/discord', (req, res) => {
            res.render("discord")
            // req.redirect('https://discord.gg/PUNxTeKpfq');
        })

        app.get('/commands', (req, res) => {
            res.render("commands")
            // req.redirect('https://discord.gg/PUNxTeKpfq');
        })

        app.get('/invite', (res, req) => {
            req.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
        })

        //Logout the user and move him back to the main page
        app.get(`/logout`, function (req, res, next) {
            return req.session.destroy(function (err) {
                // cannot access session here
                if (err) return next(err);
                return res.redirect(`/`);
            })
        });

        app.get("/dashboard", checkAuth, async (req, res) => {
            if (!req.isAuthenticated() || !req.user) return res.redirect("/?error=" + encodeURIComponent("Login First!"));
            if (!req.user.guilds) return res.redirect("/?error=" + encodeURIComponent("Unable to get your Guilds!"));

            // console.log(req.user)

            res.render("dashboard", {
                botClient: client,
                user: req.isAuthenticated() ? req.user : null,
                callback: client.con.Dashboard.callback,
                Permissions: PermissionsBitField,
                domain: client.con.Dashboard.domain
            });
        })

        // Guild settings route
        app.get('/dashboard/:id', checkAuth, (req, res) => {
            // Check if user is authenticated and has permissions

            // Retrieve guild information and settings data from your database

            // Render the settings page template with the necessary data
            res.render('settings', { 
                botClient: client,
                user: req.isAuthenticated() ? req.user : null,
                callback: client.con.Dashboard.callback,
                Permissions: PermissionsBitField,
                domain: client.con.Dashboard.domain
            });
        });

        const http = require(`http`).createServer(app);
        http.listen(port, () => {
            console.log(`[=]: HTTP-Website running on ${port} port.`)
        });
    }
}