/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdOutlineFileUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Spinner from "../../../utils/Spinner";

type Inputs = {
  logo: string;
  site_name: string;
  main_light_color: string;
  main_dark_color: string;
  primary_light_color: string;
  primary_dark_color: string;
  footer_text: string;
  email_enable: string;
  insite_enable: string;
  manual_enable: string;
};

function SiteSetting() {
  const { adminToken } = JSON.parse(
    localStorage.getItem("adminData") as string
  );
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    const defaultValues = {
      logo: settings["logo"],
      site_name: settings["site-name"],
      main_light_color: settings["main-light-color"],
      main_dark_color: settings["main-dark-color"],
      primary_light_color: settings["primary-light-color"],
      primary_dark_color: settings["primary-dark-color"],
      footer_text: settings["footer-text"],
      email_enable: settings["email-enable"],
      insite_enable: settings["insite-enable"],
      manual_enable: settings["manual-enable"],
    };
    reset(defaultValues as any);
  }, [settings]);


  useEffect(() => {
    setLoading(true)
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/setting`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((d) => {
        setLoading(false)
        const data = d.data.data;
        for (const i in data) {
          setSettings((old: any) => ({ ...old, [data[i].key]: data[i].value }));
        }
      });
  }, []);


  const onSubmit = (data: any) => {
    // setLoading(true);
    console.log(data)
    // axios
    //   .post(`${import.meta.env.VITE_BASEURL}/api/admin/setting/update`, data, {
    //     headers: {
    //       Authorization: `Bearer ${adminToken}`,
    //     },
    //   })
    //   .then((d) => {
    //     console.log(d);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };



  return (
    <div className="flex flex-col gap-5 w-full [&>*]:rounded-md">
      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}

      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full [&>*]:rounded-md"
        >
          <div className="flex flex-col py-4 px-4 bg-[#1F1F1F]">
            <div className="flex justify-between mb-6">
              <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                Logo
              </span>
            </div>
            <div className="flex gap-2">
              <div className="bg-white rounded-2xl p-4 ">
                <div className="flex items-center flex-col gap-4 text-mainLightBlack ">
                  <span>Default Logo</span>
                  <img src="/assets/logo.png" alt="default logo" />
                  <label
                    htmlFor="defaultlogo"
                    className="bg-mainLightColor cursor-pointer text-xs p-3 rounded-md flex justify-between items-center gap-3"
                  >
                    <MdOutlineFileUpload className="text-2xl" />
                    upload new logo
                    <input
                      id="defaultlogo"
                      type="file"
                      {...register("logo")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 ">
                <div className="flex items-center flex-col gap-4 text-mainLightBlack ">
                  <span>Dark Logo</span>
                  <img src="/assets/logo.png" alt="default logo" />
                  <label
                    htmlFor="darklogo"
                    className="bg-mainLightColor cursor-pointer text-xs p-3  rounded-md flex justify-between items-center gap-3"
                  >
                    <MdOutlineFileUpload className="text-2xl" />
                    upload new logo
                    <input
                      id="darklogo"
                      type="file"
                      {...register("logo")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 bg-[#1F1F1F]">
            <div className="flex justify-between mb-6">
              <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                Site name
              </span>
            </div>
            <div className="flex items-center justify-between  gap-5">
              <input
                type="text"
                {...register('site_name')}
                defaultValue={settings["site-name"]}
                className="border border-opacity-25 grow rounded-md px-3 bg-transparent py-2 border-mainWhite"
              />
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 bg-[#1F1F1F]">
            <div className="flex justify-between mb-6">
              <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                Footer Text
              </span>
            </div>
            <div className="flex items-center justify-between  gap-5">
              <input
                type="text"
                {...register('footer_text')}
                defaultValue={settings["footer-text"]}
                className="border border-opacity-25 grow rounded-md px-3 bg-transparent py-2 border-mainWhite"
              />
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 bg-white text-mainLightBlack">
            <div className="flex justify-between mb-6">
              <span className="ps-3 border-mainLightColor text-mainLightBlack border-s-4 font-medium">
                Theme Customizer
              </span>
            </div>
            <div className="flex flex-col  gap-5">
              <div className="flex flex-col gap-2 ">
                <b>Color settings</b>

                <div className="flex flex-wrap flex-col  justify-between items-start w-[300px]">
                  <span className="w-1/2 text-sm">Main color </span>
                  <div className="flex w-full gap-x-2">
                    <label
                      className="size-10 rounde cursor-pointer rounded-md"
                      style={{ background: settings["main-light-color"] }}
                      htmlFor="main_light_color"
                    >
                      <input
                        type="color"
                        id="main_light_color"
                        className="hidden"
                        defaultChecked={settings["main-light-color"]}
                        onChange={(e) => {
                          setSettings((old: any) => ({
                            ...old,
                            ["main-light-color"]: e.target.value,
                          }));
                        }}
                      />
                    </label>
                    <label
                      className="size-10 rounde cursor-pointer rounded-md"
                      style={{ background: settings["main-dark-color"] }}
                      htmlFor="main_dark_color"
                    >
                      <input
                        type="color"
                        id="main_dark_color"
                        className="hidden"
                        defaultChecked={settings["main-dark-color"]}
                        onChange={(e) => {
                          setSettings((old: any) => ({
                            ...old,
                            ["main-dark-color"]: e.target.value,
                          }));
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap flex-col  justify-between items-start w-[300px]">
                  <span className="w-1/2 text-sm">Primary color </span>
                  <div className="flex w-full gap-x-2">
                    <label
                      className="size-10 rounde cursor-pointer rounded-md"
                      style={{ background: settings["primary-light-color"] }}
                      htmlFor="primary_light_color"
                    >
                      <input
                        type="color"
                        id="primary_light_color"
                        className="hidden"
                        defaultChecked={settings["primary-light-color"]}
                        onChange={(e) => {
                          setSettings((old: any) => ({
                            ...old,
                            ["primary-light-color"]: e.target.value,
                          }));
                        }}
                      />
                    </label>
                    <label
                      className="size-10 rounde cursor-pointer rounded-md"
                      style={{ background: settings["primary-dark-color"] }}
                      htmlFor="primary_dark_color"
                    >
                      <input
                        type="color"
                        id="primary_dark_color"
                        className="hidden"
                        defaultChecked={settings["primary-dark-color"]}
                        onChange={(e) => {
                          setSettings((old: any) => ({
                            ...old,
                            ["primary-dark-color"]: e.target.value,
                          }));
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button type="submit" className="btn !rounded-md">
              {" "}
              Update{" "}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SiteSetting;
