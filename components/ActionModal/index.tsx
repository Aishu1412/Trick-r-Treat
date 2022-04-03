import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FolderDownloadIcon } from "@heroicons/react/outline";
import Link from "next/link";

interface Props {
  title: string;
  message: string;
  actionButtonTitle: string;
  cancelButtonTitle?: string;
  actionURLs: string[];
  cancelAction: () => void;
  show?: boolean;
}

export const ActionModal: React.FC<Props> = ({
  title,
  message,
  actionButtonTitle,
  cancelButtonTitle = "Cancel",
  actionURLs,
  cancelAction,
  show,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={cancelAction}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FolderDownloadIcon
                    className="h-6 w-6 text-purple-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 mb-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                  {actionURLs.length > 1
                    ? actionURLs.map((url, i) => (
                        <div key={i}>
                          <Link href={url} passHref={true}>
                            <a className="block pl-2 pt-1 pb-1 truncate text-xs max-w-md font-mono bg-purple-50 border-l-2 border-purple-600 mb-1 hover:bg-purple-200">
                              Download Batch {i}
                            </a>
                          </Link>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {actionURLs.length == 1 ? (
                  <Link href={actionURLs[0]} passHref={true}>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => cancelAction()}
                    >
                      {actionButtonTitle}
                    </button>
                  </Link>
                ) : (
                  ""
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => cancelAction()}
                  ref={cancelButtonRef}
                >
                  {cancelButtonTitle}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
