##Reddit History Sanitizer

####Allows you to obfuscate and delete all of your Reddit comments from your user profile older than customizable date.

Just navigate to your profile while logged in, and Reddit History Sanitizer will start looking for old comments. You'll have to switch it off if you're just trying to browse your old comments though.

This was created after use of [Reddit Secure Delete - Only Comments More Than 7 Days Old](https://greasyfork.org/en/scripts/16554-reddit-secure-delete-only-comments-more-than-7-days-old/code), and is meant to be an improvement on that based on my own expectations of the script. Mainly, I wanted it to continue searching for comments beyond just the first page. I also chose not to use the unsafeWindow object, which I think makes it a bit more secure.

If there are other features you would like added, or bugs are found, just report on greasyfork [Reddit History Sanitizer](https://greasyfork.org/en/scripts/23605-reddit-history-sanitizer) or on the github [Reddit-History-Sanitizer](https://github.com/ryanford-frontend/Reddit-Comment-Sanitizer)

\* Take note, this was made with es6 javascript promises and generators, so if you're using some Win95 browser like IE, it may not work as expected.