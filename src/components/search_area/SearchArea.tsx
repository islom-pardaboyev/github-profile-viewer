import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useGetUserDataQuery } from "../../store/api/get-user-data-api";
import { months, ResponseContext } from "../../utils";
import { Calendar, MapPin, Users } from "lucide-react";
import Header from "../header/Header";

type FormValue = {
  user_name: string;
};

function SearchArea() {
  const { register, handleSubmit, formState } = useForm<FormValue>();
  const [name, setName] = useState<string>('');
  const { errors } = formState;
  const { data, isLoading, isError } = useGetUserDataQuery(name as string) as {
    data: ResponseContext;
    isLoading: boolean;
    isError: boolean;
  };
  const formSubmit = (data: FormValue) => {
    setName(data.user_name);
  };
  console.log(data);
  const showDate = (date: string): string => {
    const dateObj = new Date(date);
    return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  };

  return (
    <main>
      <Header/>
      <section className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="border rounded-md w-[37vw] p-5 flex flex-col gap-5 bg-white">
          <h1 className="text-center font-bold text-2xl">
            GitHub Profile Viewer
          </h1>
          <form
            action=""
            onSubmit={handleSubmit(formSubmit)}
            className="flex items-start gap-3"
          >
            <div className="flex flex-col w-full">
              <Input
                {...register("user_name", {
                  required: "Username is required",
                })}
                placeholder="Enter GitHub username"
                className={
                  errors.user_name &&
                  "border-red-500 border-2 focus-visible:ring-0"
                }
              />
              <p className="text-xs font-bold text-red-500">
                {errors.user_name?.message}
              </p>
            </div>
            <Button>Search</Button>
          </form>
          {data && (
            <div className="flex border rounded-md p-7 items-start gap-5">
              <img className="rounded-full w-32" src={data.avatar_url} alt="" />
              <div>
                <h1 className="font-bold text-2xl">{data.name}</h1>
                <p className="text-gray-500 mb-2">@{data.login}</p>
                <p className="mb-4">{data.bio || "No bio"}</p>
                <div className="items-center grid grid-cols-2 gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>
                      {data.followers} followers · {data.following} following
                    </span>
                  </div>
                  {data.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{data.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Joined {showDate(data.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isLoading && name && (
            <div className="flex border rounded-md p-7 w-full items-start gap-5 animate-pulse">
              <div className="rounded-full w-32 h-32 bg-gray-200"></div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="items-center grid grid-cols-2 gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
                    <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
                    <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
                    <div className="h-4 bg-gray-200 rounded w-full inline-block"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isError && name && (
            <p className="text-red-500 text-center">User not found</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default SearchArea;
