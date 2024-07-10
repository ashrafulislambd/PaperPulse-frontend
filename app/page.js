"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "./config";
import clsx from "clsx";
import Link from "next/link";
import Header from "./components/header";


export default () => {
  // PAGINATION
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // END PAGINATION

  // MAIN PAGE CODES START HERE

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/article/list/?sort_by=time&page=${currentPage}`)
      .then(res => res.json())
      .then(res => {
        setNewsList(res.results);
        let arr = [];
        let pageCount = (parseInt(res.count)+9)/10;
        for(let i=1; i<=pageCount; i++) {
          arr.push(i);
        }
        setPages(arr);
      });
  }, [currentPage]);

  // MAIN PAGE CODES END HERE

  return (
    <div>
        <div>
          <nav className="flex justify-center" aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <a onClick={() => {
                  if(currentPage > 1)
                    setCurrentPage(currentPage - 1);
                }} href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
              </li>
              {
                pages.map(page => (
                  <li>
                    <a href="#" onClick={() => {
                      setCurrentPage(page);
                    }} className={
                      clsx({"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white": page != currentPage,
                        "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white": page == currentPage,
                      })
                      }>{ page }</a>
                  </li>
                ))
              }
              <li>
                <a onClick={() => {
                  if(currentPage < pages.length)
                    setCurrentPage(currentPage + 1);
                }} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
              </li>
            </ul>
          </nav>
          {
            newsList.map(news => {
              return (
                <div className="bg-green-50 p-4 my-4">
                  <h1 className="text-2xl font-bold">{ news.headline }</h1>
                  <p>{ news.body.slice(0, 50) }... <Link className="font-semibold text-purple-900 hover:underline" href={`/article/${news.id}`}>See more</Link></p>
                </div>
              )
            })
          }
          <nav className="flex justify-center" aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <a onClick={() => {
                  if(currentPage > 1)
                    setCurrentPage(currentPage - 1);
                }} href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
              </li>
              {
                pages.map(page => (
                  <li>
                    <a href="#" onClick={() => {
                      setCurrentPage(page);
                    }} className={
                      clsx({"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white": page != currentPage,
                        "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white": page == currentPage,
                      })
                      }>{ page }</a>
                  </li>
                ))
              }
              <li>
                <a onClick={() => {
                  if(currentPage < pages.length)
                    setCurrentPage(currentPage + 1);
                }} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
              </li>
            </ul>
          </nav>
        </div>
    </div>
  )
}