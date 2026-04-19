"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Plus } from "lucide-react";
import { useBoardStore } from "@/store/boardStore";
import { useShallow } from "zustand/react/shallow";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Task } from "@/types/board.types";
import {
    DatesSetArg,
    DayCellContentArg,
    EventContentArg,
} from "@fullcalendar/core/index.js";

export default function CalendarBoard() {
    const calendarRef = useRef<FullCalendar>(null);
    const path = useParams();

    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0],
    );
    const [calendarTitle, setCalendarTitle] = useState<string>("");

    const { tasks, boardId } = useBoardStore(
        useShallow((s) => ({
            tasks: s.tasks,
            boardId: s.boardId,
        })),
    );

    useEffect(() => {
        if (!boardId && !path.id) return;
        useBoardStore.getState().loadTasks(boardId || (path.id as string));
    }, [boardId, path.id]);

    const handleDateClick = useCallback((arg: { dateStr: string }) => {
        setSelectedDate(arg.dateStr);
    }, []);

    const goToToday = useCallback(() => {
        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
        if (calendarRef.current) {
            calendarRef.current.getApi().today();
        }
    }, []);

    const handleDatesSet = useCallback((arg: DatesSetArg) => {
        setCalendarTitle(arg.view.title);
    }, []);

    const calendarEvents = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        start:
            (task as Task).due_date?.split(" ")[0] ||
            new Date().toISOString().split("T")[0],
        backgroundColor: task.color || "#4ade80",
        extendedProps: {
            ...task,
        },
    }));

    const selectedDayTasks = tasks.filter((task) => {
        const taskDate =
            (task as Task).due_date?.split("T")[0] ||
            new Date().toISOString().split("T")[0];
        return taskDate === selectedDate;
    });

    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <div
                className="h-1.5 w-8 rounded-full mb-1"
                style={{ backgroundColor: eventInfo.event.backgroundColor }}
            />
        );
    };

    const renderDayCellContent = (dayInfo: DayCellContentArg) => {
        const nextDay = new Date(dayInfo.date);

        nextDay.setDate(nextDay.getDate() + 1);

        const isSelected = nextDay.toISOString().split("T")[0] === selectedDate;

        return (
            <div className="flex flex-col w-full h-full justify-between pointer-events-none p-1">
                <span
                    className={cn(
                        "font-bold text-xs leading-[133%] transition-colors",
                        dayInfo.isPast && !isSelected
                            ? "text-neutral-600"
                            : "text-[#e5e2e3]",
                        isSelected && "text-[#d0bcff] font-bold",
                    )}
                >
                    {dayInfo.dayNumberText}
                </span>
            </div>
        );
    };

    const isTodaySelected =
        selectedDate === new Date().toISOString().split("T")[0];

    return (
        <div className="min-h-screen bg-[#141414] text-white flex flex-col p-4 lg:p-6 font-sans">
            <header className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {calendarTitle || "Loading..."}
                    </h1>
                    <Button
                        variant="secondary"
                        onClick={goToToday}
                        className="border w-26.5 h-9.5 bg-[#1c1b1c] p-1 rounded-lg border-solid border-[rgba(73,68,84,0.1)] font-bold text-xs leading-[133%] tracking-widest uppercase text-center text-slate-400"
                    >
                        Today
                    </Button>
                </div>
                <Button className="w-28.5 h-9.5">
                    <Plus />
                    Add Task
                </Button>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                <div className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 shadow-2xl border border-white/2 overflow-hidden">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={false}
                        events={calendarEvents}
                        dateClick={handleDateClick}
                        datesSet={handleDatesSet}
                        dayCellContent={renderDayCellContent}
                        eventContent={renderEventContent}
                        fixedWeekCount={false}
                        height="100%"
                        dayMaxEvents={false}
                        dayCellClassNames={(arg) => {
                            const nextDay = new Date(arg.date);

                            nextDay.setDate(nextDay.getDate() + 1);

                            const isSelected =
                                nextDay.toISOString().split("T")[0] ===
                                selectedDate;
                            return isSelected ? ["selected-day"] : [];
                        }}
                    />
                </div>

                <div className="w-full lg:w-95 bg-[#1A1A1A] rounded-2xl p-6 shadow-2xl border border-white/2 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                            {isTodaySelected
                                ? "Today's Tasks"
                                : `Tasks for ${new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                        </h2>
                        <span className="text-[10px] font-semibold bg-white/10 px-2 py-0.5 rounded-full text-neutral-300">
                            {selectedDayTasks.length} Active
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                        {selectedDayTasks.length > 0 ? (
                            selectedDayTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-[#222222] rounded-xl p-4 border border-white/5 relative overflow-hidden group flex flex-col"
                                >
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-0.75"
                                        style={{
                                            backgroundColor:
                                                task.color || "#4ade80",
                                        }}
                                    />
                                    <div className="flex justify-between items-start mb-1 pl-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                                            Task
                                        </span>
                                        <span className="text-[10px] text-neutral-500">
                                            {new Date(
                                                selectedDate,
                                            ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-white text-start my-2 pl-3 text-sm">
                                        {task.title}
                                    </h3>
                                    <div className="flex items-center gap-2 pl-3">
                                        <div className="w-5 h-5 rounded-full bg-neutral-700 overflow-hidden flex items-center justify-center border border-neutral-600">
                                            <span className="text-[8px] font-medium text-neutral-300">
                                                U
                                            </span>
                                        </div>
                                        <span className="text-xs text-neutral-400">
                                            Unassigned
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-10 text-neutral-600 text-sm">
                                No tasks found for this date.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
