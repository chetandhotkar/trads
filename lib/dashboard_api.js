
var get_dashboard_count = function (){
    elastic.getDashboardCount('','');
}

module.exports = {
    get_dashboard_count : get_dashboard_count
}