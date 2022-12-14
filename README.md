# LinguaBot
![fshbsdfhj](https://user-images.githubusercontent.com/32823036/200182295-42f4660f-cd66-4ea3-9f01-b48ce1b0b74d.png)

### Language immersion for anyone anywhere





## What this is

This is a chatbot that immerses users in a language through real-time verbal or written conversation with 50+ language options. The user can speak directly to the chatbot or type what they want to say, and the chatbot will respond in both text and speech in the same language used.

The way this is intended to work is to have:
1. User talks/types on UI which sends requests to the backend
2. Backend processes what the user says in the associated language and generates a response
3. The response is sent to the frontend
4. The response is read out loud in a human voice

To accomplish this, we used React with Next.js to design a beautiful-looking sound wave display of the user's voice. We display what the audio file recorded converted to text and then display the chatbot's response. The front end sends the audio file that gets generated by the user if they chose to use speech to the backend which receives the audio file and plays it in the background of the app.
Our goal for the backend was to process either an audio file or a text file from the front end and then return a response in both text and audio format. To accomplish this, we used a Flask Backend, which we learned how to create. To manage API requests for translation, convert audio files to text, convert text to speech files, and response generation using BlenderBot 2.0. In our backend, we first checked if the user chose to record their message using their voice or if they decided to text it as input. If they recorded it using their voice, then that means the front end sent the backend their message as an audio file. Our backend then processes this audio file using the Google Cloud Speech-to-text API so that we can convert the audio into a string. We display the string on the frontend UI and then pass this string into BlenderBot 2.0 so that we can generate a response in a different language. We take this response and pass it through the Google Cloud Text to Speech service to generate another audio file of a human talking in the associated language. This audio file is then played in the background of our front end to the user.

Challenges we ran into
We had trouble finding the right model for speech-to-text to ensure it was analyzed in real-time.

Accomplishments that we're proud of
How many languages it can speak in and understand. The complexity of the replies as well as their speed.

What we learned
We learned how to use Flask to connect a front end to a back end. Learned how to make requests using Google Cloud Services. We learned React.

What's next for LinguaBot
Next for LinguaBot is to implement more languages, including ASL, using a camera as input. We also want to implement a rating system that rates the user on how well they speak to Lingua. This would allow us to match users of similar skill levels and allow them to talk to each other.

