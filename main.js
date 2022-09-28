var sitesList = document.getElementById('sites');
var data = document.getElementById('data');

var base_url = 'https://kontests.net/api/v1/';

var sitesUrl = base_url + 'sites';

getSites(sitesUrl);

function getSites(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySites(data);
        })
        .catch(error => console.log(error));
}

function displaySites(sites) {
    var firstButton = document.createElement('button');
    firstButton.innerHTML = 'All';
    firstButton.setAttribute('id', 'all');
    firstButton.setAttribute('class', 'site-button');
    firstButton.addEventListener('click', function() {
        var siteUrl = base_url  + 'all';
        showLoading();
        getContests(siteUrl);
    });
    sitesList.appendChild(firstButton);
    sites.forEach(site => {
        // create buttons
        var button = document.createElement('button');
        button.innerHTML = site[0];
        button.setAttribute('id', site[1]);
        button.setAttribute('class', 'site-button');
        button.addEventListener('click', function() {
            var siteUrl = base_url  + site[1];
            showLoading();
            getContests(siteUrl);
        });
        sitesList.appendChild(button);
    });
}

function getContests(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayContests(data);
        })
        .catch(error => console.log(error));
}

function displayContests(contests) {
    data.innerHTML = '';
    contests.forEach(contest => {
        var contestDiv = document.createElement('div');
        contestDiv.setAttribute('class', 'contest');
        var contestName = document.createElement('h3');
        contestName.innerHTML = contest.name;
        var visitContest = document.createElement('button');
        visitContest.innerHTML = 'Visit';
        visitContest.setAttribute('class', 'visit-button');
        visitContest.addEventListener('click', function() {
            window.open(contest.url);
        }
        );
        var contestStartTime = document.createElement('p');
        contestStartTime.innerHTML = '<b>Start time: </b>' + new Date(contest.start_time).toLocaleString();
        var contestEndTime = document.createElement('p');
        contestEndTime.innerHTML = '<b>End time: </b>' + new Date(contest.end_time).toLocaleString();
        var contestDuration = document.createElement('p');
        contestDuration.innerHTML = '<b> Duration: </b>' + convertSeconds(contest.duration);
        var contestSite = document.createElement('p');
        if(contest.site == 'undefined') {
            contestSite.innerHTML = '<b>Site: </b>' + 'unknown';
        }else {
            contestSite.innerHTML = '<b>Site: </b>' + contest.site;
        }
        if(contest.status == 'CODING') {
            var contestStatus = document.createElement('p');
            contestStatus.innerHTML = '<b>Status: </b>' + 'Live';
            contestStatus.setAttribute('class', 'coding');
            contestDiv.appendChild(contestStatus);
        }else if (contest.status == 'BEFORE') {
            var contestStatus = document.createElement('p');
            contestStatus.innerHTML = '<b>Status: </b>' + contest.status;
            contestStatus.setAttribute('class', 'before');
            contestDiv.appendChild(contestStatus);
            if(contest.in_24_hours == 'YES') {
                var in24Hours = document.createElement('p');
                in24Hours.innerHTML = '<b>In 24 hours: </b>' + contest.in_24_hours;
                in24Hours.setAttribute('class', 'in-24-hours');
                contestDiv.appendChild(in24Hours);
            }else{
                var in24Hours = document.createElement('p');
                in24Hours.innerHTML = '<b>In 24 hours: </b>' + contest.in_24_hours;
                in24Hours.setAttribute('class', 'not-in-24-hours');
                contestDiv.appendChild(in24Hours);
            }
        } else {
            var contestStatus = document.createElement('p');
            contestStatus.innerHTML = '<b>Status: </b>' + contest.status;
            contestStatus.setAttribute('class', 'after');
            contestDiv.appendChild(contestStatus);
        }

        contestDiv.appendChild(contestSite);
        contestDiv.appendChild(contestName);
        contestDiv.appendChild(visitContest);
        contestDiv.appendChild(contestStartTime);
        contestDiv.appendChild(contestEndTime);
        contestDiv.appendChild(contestDuration);
        data.appendChild(contestDiv);
    });
}

function secondsToDaysHoursMinutesSeconds(seconds) {
    var days = Math.floor(seconds / 86400);
    seconds %= 86400;
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function showLoading() {
    data.innerHTML = '<div class="loading"><img src="https://i.pinimg.com/originals/30/c4/70/30c4708468d108046b09feae6fee4eb1.gif" alt="Loading..." /></div>';
}

function convertSeconds(seconds) {
    var years = Math.floor(seconds / 31536000);
    seconds %= 31536000;
    var months = Math.floor(seconds / 2592000);
    seconds %= 2592000;
    var days = Math.floor(seconds / 86400);
    seconds %= 86400;
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;
    if(years > 0) {
        return years + 'y ' + months + 'm ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    } 
    else if(months > 0) {
        return months + 'm ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    } 
    else if(days > 0) {
        return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
    else if(hours > 0) {
        return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
    else if(minutes > 0) {
        return minutes + 'm ' + seconds + 's';
    }
    else {
        return seconds + 's';
    }
}
