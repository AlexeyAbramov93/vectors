// to get coordinates A1,A2,A0 from radius and angle of A B C 

function getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC){

    let fiArad=fiA*Math.PI/180;
    let fiBrad=fiB*Math.PI/180;
    let fiCrad=fiC*Math.PI/180;
    let fi120rad=120*Math.PI/180; 
    let fi240rad=240*Math.PI/180; 
    
    let A1x = (vA*Math.cos(fiArad)+vB*Math.cos(fiBrad+fi120rad)+vC*Math.cos(fiCrad+fi240rad))/3;
    let A1y = (vA*Math.sin(fiArad)+vB*Math.sin(fiBrad+fi120rad)+vC*Math.sin(fiCrad+fi240rad))/3;

    let A2x = (vA*Math.cos(fiArad)+vB*Math.cos(fiBrad+fi240rad)+vC*Math.cos(fiCrad+fi120rad))/3;
    let A2y = (vA*Math.sin(fiArad)+vB*Math.sin(fiBrad+fi240rad)+vC*Math.sin(fiCrad+fi120rad))/3;

    let A0x = (vA*Math.cos(fiArad)+vB*Math.cos(fiBrad)+vC*Math.cos(fiCrad))/3;
    let A0y = (vA*Math.sin(fiArad)+vB*Math.sin(fiBrad)+vC*Math.sin(fiCrad))/3;

    return {'A1x': A1x, 'A1y': A1y,
            'A2x': A2x, 'A2y': A2y,
            'A0x': A0x, 'A0y': A0y};
}
