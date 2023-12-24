const express = require("express");

module.exports = (req, res) => {
	global.isLoggedIn = false
	req.session.destroy(function (err) {
		global.userType = ''
		res.redirect('/')
	})
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/