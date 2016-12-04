/**
 * Created by Andrew Heyworth on 04/12/2016.
 */
var count = 0;
var tdLength = 0;
var cellsInTablet = 22;//including forward and backward buttons
/*
 * On the donor cells order by ordinal, hide, detach from main table and re-attach to donor
 *
 * */
function donor() {
    $('.table-body-td').hide()
        .detach()
        .appendTo('.donor-table-body')
        .sort(function (a, b) {
            return +a.dataset.ordinal - +b.dataset.ordinal;
        });

    $('.table-body-pupil-td').hide()
        .detach()
        .appendTo('.donor-table-body')
        .sort(function (a, b) {
            return +a.dataset.ordinal - +b.dataset.ordinal;
        });

    $('.table-head-th').hide()
        .detach()
        .appendTo('.donor-table-head')
        .sort(function (a, b) {
            return +a.dataset.ordinal - +b.dataset.ordinal;
        });
}
/*
 * Filter cell selection, sort by ordinal, get the first 20, detach from donor, attach after the
 * backwards button and un-hide
 *
 * */
function populate() {
    //populate body of table
    $('.table-body-td')
        .filter(function () {
            return $(this).data('ordinal') > count;
        })
        .sort(function (a, b) {
            return +a.dataset.ordinal - +b.dataset.ordinal;
        })
        .slice(0, (cellsInTablet - 2))
        .detach()
        .insertAfter('.dyno-table-back-btn')
        .show();

    //populate header of table
    $('.table-head-th')
        .filter(function () {
            return $(this).data('ordinal') > count;
        })
        .sort(function (a, b) {
            return +a.dataset.ordinal - +b.dataset.ordinal;
        })
        .slice(0, (cellsInTablet - 2))
        .detach()
        .insertAfter('.dyno-table-head-title-spacer')
        .show();

    for(var i = 0; i < $('.dyno-table-body-pupil-name').length; i++){
        $('.table-body-pupil-td')
            .filter(function () {
                return $(this).data('ordinal') > count && $(this).data('name')=== $('.dyno-table-body-pupil-name')[i].innerHTML;
            })
            .sort(function (a, b) {
                return +a.dataset.ordinal - +b.dataset.ordinal;
            })
            .slice(0, (cellsInTablet - 2))
            .detach()
            .insertAfter($('.dyno-table-body-pupil-spacer')[i])
            .show();
    }
    }

/*
 * On click event record current position, in there's the right number of cells displayed
 * allow for forward and backward movement else only allow for backward movement
 *
 * */
function btnPress(e) {

    var advance = $('.dyno-table-body-results-tr td').filter(function () {
        return $(this).css('display') === 'table-cell';
    }).length;


    if (advance === cellsInTablet + 2) {
        if (e.target.id === "backward" && count > 0) {
            count--;
        } else if (e.target.id === "forward" && count < tdLength) {
            count++;
        }
        donor();

        populate();

    } else if (advance === (cellsInTablet + 1)) {
        if (e.target.id === "backward" && count > 0) {
            count--;
        }

        donor();

        populate();

        /*console.log('count this ' + $('.dyno-table-body tr td').filter(function () {
         return $(this).css('display') === 'table-cell';
         }).length);*/
    }
}
/*
 * On window load create a donor table with cells and count how many cells were created.
 * Create the main table, add direct buttons and table-body-holding-td cells
 * */
$(window).load(function () {
    //console.log($('.dyno-table-body-pupil-name'));
    for (var i = 0; i < 41; i++) {
        $('.donor-table-body').append('<tr><td class="table-body-td" data-ordinal= ' + i + '>' + i + '</td></tr>').hide();
        $('.donor-table-head').append('<tr><th class="table-head-th" data-ordinal= ' + i + '>' + i + '</th></tr>').hide();
        $('.donor-table-body').append('<tr><td class="table-body-pupil-td" data-name="pupils 1" data-ordinal= ' + i + '>' + i + 'a</td></tr>').hide();
        $('.donor-table-body').append('<tr><td class="table-body-pupil-td" data-name="pupils 2" data-ordinal= ' + i + '>' + (i * 5) + 'b</td></tr>').hide();
    }
    tdLength = $('.table-body-td').length;
    $('.dyno-table-body-results-tr').append('<td> results </td>');
    $('.dyno-table-body-results-tr').append('<td id="backward" class="dyno-table-back-btn" data-ordinal="0"> < </td>');
    populate();
    $('.dyno-table-body-results-tr').append('<td class="dyno-table-head-blank">  </td>');
    $('.dyno-table-body-results-tr').append('<td id="forward" class="dyno-table-forward-btn" data-ordinal="21"> > </td>');
    $('.dyno-table-forward-btn, .dyno-table-back-btn').on('click', btnPress);
});