'use server'
import React from 'react'

export async function modelLoader(id){
  var exec = require('child_process').exec;
  var fs = require('fs');
  var testFolder = 'D:\\THIEN\\Studying\\LUAN VAN PROJECT\\Next + Three\\thesis\\public\\models'
  const files = fs.readdirSync(testFolder)
  exec(`npx gltfjsx public/models/${files[files.length - 1]}`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  });
}

