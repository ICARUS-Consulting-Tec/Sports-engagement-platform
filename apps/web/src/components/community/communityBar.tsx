import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
        
interface CommunityBarProps {
    onSwitchOpenModal: (isOpen: boolean) => void;
    activeFilter: "hot" | "new" | "top";
    setActiveFilter: (filter: "hot" | "new" | "top") => void;
}

const CommunityBar = (props: CommunityBarProps) => {
    const { onSwitchOpenModal, activeFilter, setActiveFilter } = props;

    return(
        <>
            <div className="flex items-center justify-between rounded-lg p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFilter("hot")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeFilter === "hot"
                      ? "bg-red-50 text-red-500 border-b-2 border-red-500"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon icon="mdi:fire" width={18} />
                  Hot
                </button>

                <button
                  onClick={() => setActiveFilter("new")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeFilter === "new"
                      ? "bg-blue-50 text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon icon="mdi:star-circle-outline" width={18} />
                  New
                </button>

                <button
                  onClick={() => setActiveFilter("top")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeFilter === "top"
                      ? "bg-green-50 text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon icon="mdi:trending-up" width={18} />
                  Top
                </button>
              </div>

              <Button
                onClick={() => onSwitchOpenModal(true)}
                className="bg-[#0B2A55] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#1D4E89] transition-colors flex items-center gap-2"
              >
                <Icon icon="mdi:plus" width={20} />
                Create Post
              </Button>
            </div>
        </>
    )
}

export default CommunityBar;
