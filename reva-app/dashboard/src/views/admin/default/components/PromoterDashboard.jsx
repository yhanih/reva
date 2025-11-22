```
            </div >

    {/*import PayoutGoal from "./promoter/PayoutGoal";

const PromoterDashboard = () => {
  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <GlassWidget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings This Month"}
          subtitle={"$340.50"}
        />
        <GlassWidget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Available Balance"}
          subtitle={"$642.39"}
        />
        <GlassWidget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Clicks Today"}
          subtitle={"1,245"}
        />
        <GlassWidget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Valid Click Rate"}
          subtitle={"94%"}
        />
        <GlassWidget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Active Campaigns"}
          subtitle={"7"}
        />
        <GlassWidget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Lifetime Earnings"}
          subtitle={"$2,433"}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <ClickPerformance />
        <div className="grid grid-cols-1 gap-5">
            <WeeklyEarnings />
            <PayoutGoal />
        </div>
      </div>
            </div >
        </div >
    );
};

export default PromoterDashboard;
```
