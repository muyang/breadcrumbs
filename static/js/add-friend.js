"use strict";

function showSentRequest(result) {
      $("#add-friend-btn").val(result).attr("disabled", true)
    }

function sendFriendRequest(evt) {
  evt.preventDefault();

  var formInput = {
    "user_b_id": $("#add-friend-form").data("userid")
  };

  $.post("/add-friend", 
         formInput,
         showSentRequest
         );
}

$("#add-friend-form").on("submit", sendFriendRequest);