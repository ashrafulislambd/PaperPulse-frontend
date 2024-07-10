"use client";

import { BASE_URL } from "@/app/config";
import Link from "next/link";
import { useEffect, useState } from "react"

export default ({ params }) => {
    const [article, setArticle] = useState(null);
    const [relatedNewsList, setRelatedNewsList] = useState([]);
    const [ratings, setRatings] = useState([]);

    const [value, setValue] = useState(4);
    const [body, setBody] = useState("");
    const [trigger, setTrigger] = useState(0);
    const [timeStr, setTimeStr] = useState("");

    useEffect(() => {
        const articleId = params.id;
        fetch(`${BASE_URL}/article/list/${articleId}`)
            .then(res => res.json())
            .then(res => setArticle(res));
    }, []);

    useEffect(() => {
        if(article) {
            fetch(`${BASE_URL}/article/list/?cat_id=${article.category}`)
                .then(res => res.json())
                .then(res => {
                    const relatedArticles = [];
                    let i = 0;
                    while(relatedArticles.length < 2) {
                        if(article.id == res.results[i].id) {
                            i++;
                        }
                        relatedArticles.push(res.results[i++]);
                    }
                    setRelatedNewsList(relatedArticles);
                });
            
            let timeConfig = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(article.publishing_time);
            setTimeStr(date.toLocaleDateString("en-US", timeConfig));
        }
    }, [article]);

    useEffect(() => {
        if(article) {
            fetch(`${BASE_URL}/article/rating/?article_id=${article.id}`)
                .then(res => res.json())
                .then(res => setRatings(res));
        }
    }, [article, trigger]);
    
    return (
        <div>
            { article && 
                <div>
                    <h1 className="text-3xl font-bold">{ article.headline }</h1>
                    <span>Published on { timeStr }</span>
                    <p className="mt-3">{ article.body }</p>

                    <h2 className="text-2xl font-bold mt-3">Read More</h2>
                    {
                        relatedNewsList.map(news => {
                            return (
                                <div>
                                    <Link className="text-purple-950 hover:font-semibold hover:underline" href={`/article/${news.id}`}><h2 className="text-lg py-2">{ news.headline }</h2></Link>
                                </div>
                            )
                        })
                    }
                    <h2 className="text-2xl font-bold mt-3">Leave a Rating</h2>
                    <form className="flex items-start gap-2">
                        <select onChange={(e) => {
                            setValue(e.target.value);
                        }} className="bg-purple-800 p-2 rounded-lg text-white">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4" selected>4</option>
                        </select>
                        <textarea onChange={(e) => {
                            setBody(e.target.value);
                        }} className="p-4 border rounded w-[400px]" placeholder="Feedback...">

                        </textarea>
                        <button onClick={(e) => {
                            e.preventDefault();
                            fetch(`${BASE_URL}/article/rate/`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Token ${localStorage.authToken}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "user": article.editor,
                                    "article": article.id,
                                    "value": value,
                                    "body": body
                                })
                            }).then(res => res.json())
                                .then(res => {
                                    if("body" in res) {
                                        setTrigger(trigger + 1);
                                    } else {
                                        alert("Error" + JSON.stringify(res));
                                    }
                                })
                        }} className="bg-purple-800 p-2 rounded-lg text-white">Submit</button>
                    </form>
                    <h2 className="text-2xl font-bold mt-3">Average Rating: { (article.avg_rating != "-1") ? article.avg_rating.toFixed(2) : "No reviews yet" }</h2>
                    <div>
                        {
                            ratings.map(rating => 
                                <div>
                                    <div>{ rating.user.username }</div>
                                    <div>{ rating.value }</div>
                                    <div>{ rating.body }</div>
                                    <hr/>
                                </div>
                            )
                        }
                    </div>
                </div>
            }   
        </div>
    )
}