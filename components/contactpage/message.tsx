"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Pagination from "@/components/pagination";

const initialMessages = Array.from({ length: 12 }).map((_, idx) => ({
  id: idx + 1,
  fullName: "Rhodas Titans",
  email: "rhodasechere@gmail.com",
  message: "I need to build a product for my financial firm",
  timestamp: "about 1 hour ago",
  isRead: idx % 2 === 0, // every other one is unread
}));

export default function MessageTab() {
  const [messages, setMessages] = useState(initialMessages);
  const [replyOpen, setReplyOpen] = useState<{ [key: number]: boolean }>({});
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [currentTab, setCurrentTab] = useState("all");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const toggleReply = (id: number) => {
    setReplyOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  const handleSendReply = (id: number) => {
    console.log("Send:", replyText[id]);
    setReplyText((prev) => ({ ...prev, [id]: "" }));
    setReplyOpen((prev) => ({ ...prev, [id]: false }));
  };

  const filteredMessages = messages.filter((msg) => {
    if (currentTab === "read") return msg.isRead;
    if (currentTab === "unread") return !msg.isRead;
    return true;
  });

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const currentItems = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 p-6 w-[960px]">
      <Tabs
        defaultValue="all"
        value={currentTab}
        onValueChange={(val) => {
          setCurrentTab(val);
          setCurrentPage(1);
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger
              value="all"
              className="data-[state=active]:text-secondary"
            >
              All ({messages.length})
            </TabsTrigger>
            <TabsTrigger
              value="read"
              className="data-[state=active]:text-secondary"
            >
              Read ({messages.filter((m) => m.isRead).length})
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:text-secondary"
            >
              Unread ({messages.filter((m) => !m.isRead).length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={currentTab}>
          {currentItems.map((msg) => (
            <div key={msg.id}>
              <div className="flex gap-4 mb-3">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-200" />
                <div className="flex-1 text-font text-xs">
                  <p className="font-semibold">{msg.fullName}</p>
                  <p className="font-semibold">{msg.email}</p>
                  <p>{msg.message}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {msg.timestamp}
                    </span>
                    {msg.isRead ? (
                      <span
                        onClick={() => toggleReply(msg.id)}
                        className="text-orange-500 text-sm cursor-pointer"
                      >
                        Reply
                      </span>
                    ) : (
                      <span
                        onClick={() => markAsRead(msg.id)}
                        className="text-green-600 text-sm cursor-pointer"
                      >
                        Open
                      </span>
                    )}
                  </div>
                  {replyOpen[msg.id] && (
                    <div className="mt-3 flex gap-2">
                      <Input
                        value={replyText[msg.id] || ""}
                        className="border-1 border-gray-50"
                        onChange={(e) =>
                          setReplyText((prev) => ({
                            ...prev,
                            [msg.id]: e.target.value,
                          }))
                        }
                        placeholder="Write a reply..."
                      />
                      <button
                        onClick={() => handleSendReply(msg.id)}
                        className="text-secondary px-3 py-2 rounded cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredMessages.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
