Your request should be like:
[["Operation", "Where are you looking?", "What are you looking?"],["operation", "Where are you looking?", "What are you looking?"]] etc.

"Operation" could be: ">", "<", "strictEquality", "partialMatch".
"Where are you looking?" could be: "filename", "authorId", "duration", "tags".

For instance:
[[">","duration", 200],["partialMatch", "authorId", "1"],["strictEquality","tags", ["webinar","marketing"]]]
