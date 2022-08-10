//mochkil rah yetal3 max ta3 video 50 --> data.pageInfo.resultsPerPage rah yemdli 50 brk setar 33 lewwa9et rah yehsab ta3 50video brk

// let urlCorrectOfOneVideo = "https://www.googleapis.com/youtube/v3/videos?id=eCs8LT290a4&part=contentDetails&key=AIzaSyBk1m7eLfnSZntn_vldlMvK9JUtCct9moA";
// let urlCorrectOfOnePlaylist = " https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=PLDoPjvoNmBAzhFD3niPAa1C1gXG4cs14J&key=AIzaSyBk1m7eLfnSZntn_vldlMvK9JUtCct9moA"

const API_KEY = "AIzaSyBk1m7eLfnSZntn_vldlMvK9JUtCct9moA";

let idOfplaylist; // nedih m lein liyedakhelah


let myArray = [];
let inpt  = document.querySelector('.inpt'),
    getButton = document.querySelector('.get-button'),
    reposData = document.querySelector(".container-show");
    let somme = 0;

getButton.onclick = function(){
    

    if(inpt.value==""){
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    }else{
        reposData.innerHTML = "";
        
        //nedi m inp id ta3 playlist
        idOfplaylist = inpt.value.split("list=")[1];
        idOfplaylist = idOfplaylist.split("&")[0];
        
        

        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=${idOfplaylist}&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.items[50]);//data.pageInfo.totalResults
            let myVideos = data.pageInfo.totalResults;//temdlna chehal andna m video f paly list hadi
            let titleOfChenal =data.items[0].snippet.channelTitle;


            data.items.forEach(element => {
                let id = element.snippet.resourceId.videoId;
                fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    // For urlCorrectOfOneVideo
                    let duration = data.items[0].contentDetails.duration;
                    let sp = duration.split("PT").reverse();
                    myArray.push(sp[0]);
                });

            });
            setTimeout(() => {
                //console.log(myArray);//Array Of Time

                myArray.forEach(el => {
                    let heur = el.split("H").reverse();
                    if( (heur[1]==undefined)|| ( heur[1]== NaN)){
                        heur[1] = 0;
                    }
                    //console.log(heur[1]);//heur
    
                    let menit = heur[0].split("M").reverse();
                    if( (menit[1]==undefined)|| ( menit[1]== NaN)){
                        menit[1] = 0;
                    }
                    //console.log(menit[1]);//menit
    
                    let sec = menit[0].split("S").reverse();
                    if( (sec[1]==undefined)|| ( sec[1]== NaN)){
                        sec[1] = 0;
                    }
                    //console.log(sec[1]);//sec

                    somme += (+heur[1])*3600 + (+menit[1]) * 60 + (+sec[1]);
                });

                //console.log(somme);//sec

                let myHeur = somme%3600;
                //console.log(((somme-myHeur)/3600)+"H");//heur
                let myMin = myHeur%60;
                //console.log(((myHeur-myMin)/60)+"M");//menit
                let mySec = myMin%60;
                //console.log(mySec+"S");//Sec
                //console.log((((somme-myHeur)/3600)+"H ") + (((myHeur-myMin)/60)+"M ") + (mySec+"S") );



                let myDiv = document.createElement('div');
                myDiv.setAttribute("class","myDiv");
                
                let myH = document.createElement('h3');
                myH.setAttribute("class","myH");
                let myVideosPlus = "";
                if(data.pageInfo.totalResults > 50){
                    myVideosPlus += `<br>It's Time Of 50 Videos`
                }
                myH.innerHTML = `
                Channel : <span style="color:red">${titleOfChenal}</span><br>
                <span style="color:red">${myVideos}</span> Videos <span style="color:red">${myVideosPlus}</span><br> 
                Total Time : <span style="color:red">${(somme-myHeur)/3600}H ${((myHeur-myMin)/60)}M ${mySec}S</span>  
                `;//nezidlha issem ta3 playlist w khas yeb9a yehsab l ta ktar men 50 video
                myDiv.appendChild(myH);
                reposData.appendChild(myDiv);


            }, 3000);
            




        

            // data.forEach((element) => {

            //     console.log(element);

                // let myDiv = document.createElement('div');
                // myDiv.setAttribute("class","myDiv");
                
                // let myH = document.createElement('h3');
                // myH.setAttribute("class","myH");

                // myH.innerHTML = element.name;
                // myDiv.appendChild(myH);

                // let mySpan = document.createElement('span');
                // mySpan.setAttribute("class","mySpan");
                // mySpan.innerHTML = "Stars "+element.stargazers_count;
                // myDiv.appendChild(mySpan);

                // let myA = document.createElement('a');
                // myA.innerHTML = "visit";
                // myA.setAttribute("href",`https://github.com/${inpt.value}/${element.name}`)
                // myA.setAttribute("target","_blank");

                // myDiv.appendChild(myA);

                // reposData.appendChild(myDiv);
            
            // });
        });

        inpt.value = "";
        somme = 0;
        myArray = [];
    }

}




//url playlist SASS
//https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=AIzaSyBk1m7eLfnSZntn_vldlMvK9JUtCct9moA&id=PLDoPjvoNmBAzlpyFHOaB3b-eubmF0TAV2


//https://www.googleapis.com/youtube/v3/search?part=snippet&key=AlzaSyB467vw2QWQTLmFTIpqzruclVnnsGiAHGA&type=video&q=ajax

// const myPlaylist = ["04:30","05:32","03:01","14:22","41:55","24:51","03:45","08:08"];
// let time = [];
// myPlaylist.forEach(el => {
//     let sp = el.split(":").reverse();
//     let count = +sp[0];
//     for(let i = 1 ; i< sp.length ; i++){
//         count += (+sp[i]) * 60;
//     }
//     console.log(count);
//     time.push(count);
// });

// console.log(time);
// let some = 0;
// for (let i = 0; i < time.length; i++) {
//     some += time[i];
// }
// console.log(some);

// function secondsToHms(d) {
//     d = Number(d);
//     var h = Math.floor(d / 3600);
//     var m = Math.floor(d % 3600 / 60);
//     var s = Math.floor(d % 3600 % 60);
//     var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//     var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
//     var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//     return hDisplay + mDisplay + sDisplay; 
// }

// console.log(secondsToHms(some));
