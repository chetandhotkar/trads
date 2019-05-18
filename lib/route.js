
global.app.get('*', function (req, res, next) {
    //cleSYS_LOGGER.debug(req.fingerprint.hash,req.originalUrl);  
    LOGME.logThisRequest(req, res);
    next();
});


//======Index Page======
global.app.get('/', function (req, res) {
     if (req.sessionValid == 1) {
        res.redirect("/categories");
    } else {
        res.sendFile(global.base_url + '/public/index.html');
    }
});

//======DASHBOARD======


global.app.get('/dashboard_template', function (req, res) {
    if (req.sessionValid == 1) {
        var template = fs.readFileSync(global.base_url + '/public/templates/dashboard_template.html', 'utf8');
        data = {result: 'success', message: 'Dashboard template retrieved successfully.', data: {'data': {}, 'template': template}};
        res.json(data);
    } else {
        data = {result: 'error', message: 'Session does not exist.', data: {'data': {}, 'template': ''}};
        res.json(data);
    }
});

global.app.get('/customer_details_list_db', function (req, res) {
  cust_details_process.customer_details_list_db(req.query, res);
});









global.app.post('/api/login', function (req, res) {
    global.api.login(req.body.username, req.body.password, req.fingerprint.hash, req, res);
});

global.app.get('/api/logout', function (req, res) {
    global.api.logout(req.query.c, req.query.k, req.fingerprint.hash, req, res);
});

//categories Template and Function START
global.app.get('/categories', function (req, res) {
    if (req.sessionValid == 1) {
        res.sendFile(global.base_url + '/public/home.html');
    } else {
        res.sendFile(global.base_url + '/public/index.html');
    }
});

global.app.get('/categories_template', function (req, res) {
    if (req.sessionValid == 1) {
        var template = fs.readFileSync(global.base_url + '/public/templates/categories_template.html', 'utf8');
        data = {result: 'success', message: 'categories_template retrieved successfully.', data: {'data': {}, 'template': template}};
        res.json(data);
    } else {
        data = {result: 'error', message: 'Session does not exist.', data: {'data': {}, 'template': ''}};
        res.json(data);
    }
});


global.app.get('/trades/trades', function (req, res) {
    var response = categories.trades(req.query, res);
});

global.app.get('/trads/erase', function (req, res) {
    //console.log(req.query, " REQ");
    var response = categories.erase(req.query, res);
});


global.app.get('/insert_trads', function (req, res) {
    //console.log(req.query, " REQ");
    var response = categories.insert_trads(req.query, res);
});


global.app.get('/trades/users', function (req, res) {
    //console.log(req.query, " REQ");
    var response = categories.get_user_by_user_id(req.query, res);
});


global.app.get('/filter_trades/', function (req, res) {
    //console.log(req.query, " REQ");
    var response = categories.filter_trades(req.query, res);
});






// global.app.get('/categories/get_categories', function (req, res) {
//     var response = categories.get_categories(req.query, res);
// });

// global.app.get('/categories/confirm_categories', function (req, res) {
//     var response = categories.add_categories(req.query, res);
// });

// global.app.get('/categories/update_categories', function (req, res) {
//     var response = categories.update_categories(req.query, res);
// });

// global.app.get('/categories/delete_categories', function (req, res) {
//     var response = categories.delete_categories(req.query, res);
// });



//categories Template and Function END
