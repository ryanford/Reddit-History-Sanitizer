// ==UserScript==
// @name        Reddit History Sanitizer
// @namespace   Reddit History Sanitizer
// @description Obfuscate and Delete Reddit Comments Older than User Specified Time
// @include     *.reddit.com/user/*
// @version     1.0
// ==/UserScript==

// change age to extend or shorten timeframe to keep comments (in days)
const age = 7;
var toDelete = [];

function findOldComments() {
  let pageName = document.querySelector("div#header > div#header-bottom-left > span.pagename").textContent,
      userName = document.querySelector("div#header > div#header-bottom-right > span.user > a").textContent;
  if (pageName !== userName) return;
  let comments = document.querySelectorAll(".comment"),
    nextButton = document.querySelector("div.content > div#siteTable > div.nav-buttons > span.nextprev > span.next-button > a"),
    i = comments.length;
  while (i--) {
    let timeSincePost = comments[i].querySelector("div.entry > p.tagline > time").innerHTML.toLowerCase();
      if (timeSincePost.indexOf("day") > 0 && timeSincePost.match(/\d{1,2}/) > age) {
        toDelete.push(comments[i].getAttribute("id"));
      } else if (timeSincePost.indexOf("month") > 0 && age < 30) {
        toDelete.push(comments[i].getAttribute("id"));
      } else if (timeSincePost.indexOf("year") > 0 && age < 365) {
        toDelete.push(comments[i].getAttribute("id"));
      }
  }
  if (toDelete.length > 0) {
    obfuscateComment(toDelete.pop());
  } else if (nextButton) {
    nextButton.click();
  } else {
    alert("No old comments!");
  }
}

function* generator() {
  while (toDelete) {
    yield obfuscateComment(toDelete.pop());
  }
}

let gen = generator();

function obfuscateComment(eligibleComment) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz><.-,+!@#$%^&*();:[]~";
  let comment = document.getElementById(eligibleComment);
  if (!comment) document.location.reload();
  let editTextArea = comment.querySelector("div.entry > form.usertext > div.usertext-edit > div.md > textarea"),
    editTextAreaLength = editTextArea.value.length,
    editButton = comment.querySelector("div.entry > ul > li > a.edit-usertext"),
    obfuscatedComment = "",
    saveButton = comment.querySelector("div.entry > form.usertext > div.usertext-edit > div.bottom-area > div.usertext-buttons > button.save"),
    deleteButton = comment.querySelector("div.entry > ul > li > form.del-button > span > a[data-event-action=delete]"),
    confirmButton = comment.querySelector("div.entry > ul > li > form.del-button > span > a.yes");
  for (let i = 0; i < editTextAreaLength; i++) {
      if (editTextArea.value.substr(i,1) == '\n') {
        obfuscatedComment += '\n';
        } else {
        let randomNum = Math.floor(Math.random() * chars.length);
        obfuscatedComment += chars.charAt(randomNum, 1);
    }
  }

  let replaceComment = function() {
    return new Promise(
      (resolve,reject) => {
        if (editButton) {
          editButton.click();
          editTextArea.value = obfuscatedComment;
          resolve();
        } else {
          reject((e) => {
            console.log(e);
          });
        }
      }
    );
  };

  let saveComment = function() {
    return new Promise(
      (resolve, reject) => {
        if (saveButton) {
          window.setTimeout(() => {
            saveButton.click();
            resolve();
          }, 1000);
        } else {
          reject((e) => {
            console.log(e);
          });
        }
      }
    );
  };

  let deleteComment = function() {
    return new Promise(
      (resolve, reject) => {
        if (deleteButton) {
          window.setTimeout(() => {
            deleteButton.click();
            resolve();
          }, 3000);
        } else {
          reject((e) => {
            console.log(e);
          });
        }
      }
    );
  };

  let confirmDelete = function() {
    return new Promise(
      (resolve, reject) => {
        if (confirmButton) {
          window.setTimeout(() => {
            confirmButton.click();
            resolve(gen.next());
          }, 3000);
        } else {
          reject((e) => {
            console.log(e);
          });
        }
      }
    );
  };

  replaceComment()
  .then(saveComment()
  .then(deleteComment()
  .then(confirmDelete()
  )));

}

window.addEventListener("load", findOldComments);