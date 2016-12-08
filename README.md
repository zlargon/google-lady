# google-lady

Google text-to-speech URL generator (CLI)

# Usage

```
Usage: google-lady <sentence>

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -l, --lang <language>    setup language (default is "en")
  -k, --api-key <api_key>  setup Google API Key to shorten URL
```

# Example

```
$ google-lady "hi, how are you?"

https://translate.google.com/translate_tts?ie=UTF-8&q=hi%2C%20how%20are%20you%3F&tl=en&total=1&idx=0&textlen=16&tk=344288.198239&client=t&prev=input&ttsspeed=1


$ google-lady -k <API_KEY>
$ google-lady "hi, how are you?"

https://goo.gl/yxflse
```

# License

MIT
