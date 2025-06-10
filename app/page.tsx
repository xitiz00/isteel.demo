"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, AlertTriangle, DollarSign, Package, Calendar, Target, Bell } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")
  const [alerts, setAlerts] = useState([])

  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update alerts every 30 seconds in real app
      const newAlerts = [
        { id: 1, type: "warning", message: "Iron ore prices expected to rise 8% next month", time: "2 min ago" },
        { id: 2, type: "success", message: "Optimal procurement window detected for coal", time: "15 min ago" },
        { id: 3, type: "info", message: "Construction permits increased 12% in Chennai", time: "1 hour ago" },
      ]
      setAlerts(newAlerts)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Sample data - in real app, this would come from APIs
  const priceData = [
    { month: "Jan", ironOre: 12500, coal: 8500, scrap: 35000, predicted: false },
    { month: "Feb", ironOre: 13200, coal: 8800, scrap: 36500, predicted: false },
    { month: "Mar", ironOre: 12800, coal: 8600, scrap: 35800, predicted: false },
    { month: "Apr", ironOre: 13500, coal: 9200, scrap: 37200, predicted: false },
    { month: "May", ironOre: 14200, coal: 9500, scrap: 38500, predicted: false },
    { month: "Jun", ironOre: 13800, coal: 9300, scrap: 37800, predicted: false },
    { month: "Jul", ironOre: 14800, coal: 9800, scrap: 39200, predicted: true },
    { month: "Aug", ironOre: 15200, coal: 10100, scrap: 40000, predicted: true },
    { month: "Sep", ironOre: 14600, coal: 9900, scrap: 39500, predicted: true },
  ]

  const demandData = [
    { region: "Chennai North", demand: 850, growth: 12 },
    { region: "Chennai South", demand: 720, growth: 8 },
    { region: "Tambaram", demand: 450, growth: 15 },
    { region: "Kanchipuram", demand: 380, growth: 22 },
    { region: "Tiruvallur", demand: 320, growth: 18 },
  ]

  const supplierData = [
    { name: "Supplier A", score: 92, cost: "Low", quality: "High", delivery: "Excellent" },
    { name: "Supplier B", score: 87, cost: "Medium", quality: "High", delivery: "Good" },
    { name: "Supplier C", score: 78, cost: "Low", quality: "Medium", delivery: "Fair" },
    { name: "Supplier D", score: 85, cost: "High", quality: "Excellent", delivery: "Good" },
  ]

  const kpiData = [
    { title: "Cost Savings", value: "₹2.3Cr", change: "+12%", icon: DollarSign, color: "text-green-600" },
    { title: "Forecast Accuracy", value: "87%", change: "+3%", icon: Target, color: "text-blue-600" },
    { title: "Inventory Turnover", value: "8.2x", change: "+15%", icon: Package, color: "text-purple-600" },
    { title: "Procurement Cycle", value: "18 days", change: "-25%", icon: Calendar, color: "text-orange-600" },
  ]

  const procurementRecommendations = [
    { material: "Iron Ore", action: "BUY NOW", quantity: "500 MT", reason: "Price dip predicted", confidence: 92 },
    { material: "Coal", action: "WAIT", quantity: "200 MT", reason: "Better prices expected", confidence: 78 },
    { material: "Scrap Metal", action: "BUY PARTIAL", quantity: "150 MT", reason: "Moderate demand", confidence: 85 },
  ]

  const TabButton = ({ tab, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tab)}
      className={`px-8 py-4 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl shadow-red-500/25"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-red-400 border border-gray-700"
      }`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {label}
    </button>
  )

  const KPICard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:shadow-red-500/10">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-gray-400 text-sm font-medium uppercase tracking-wider"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {title}
          </p>
          <p className="text-3xl font-bold text-white mt-2" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {value}
          </p>
          <p
            className={`text-sm font-medium mt-2 ${color.replace("600", "400")}`}
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {change} vs last month
          </p>
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-red-900/50 to-red-800/50`}>
          <Icon className={`w-8 h-8 text-red-400`} />
        </div>
      </div>
    </div>
  )

  const AlertCard = ({ alert }) => (
    <div
      className={`p-6 rounded-xl border-l-4 ${
        alert.type === "warning"
          ? "bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 border-yellow-500"
          : alert.type === "success"
            ? "bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-500"
            : "bg-gradient-to-r from-blue-900/30 to-blue-800/20 border-blue-500"
      } backdrop-blur-sm`}
    >
      <div className="flex items-start">
        <AlertTriangle
          className={`w-6 h-6 mt-0.5 mr-4 ${
            alert.type === "warning" ? "text-yellow-400" : alert.type === "success" ? "text-green-400" : "text-blue-400"
          }`}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {alert.message}
          </p>
          <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {alert.time}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-red-900 shadow-xl border-b border-red-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                iSteel Supply Chain Intelligence
              </h1>
              <p className="text-gray-300 text-lg mt-1" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                AI-Powered Procurement & Market Analytics
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-red-400">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                  Live Data
                </span>
              </div>
              <div className="p-2 bg-red-900/50 rounded-lg hover:bg-red-800/50 transition-colors">
                <Bell className="w-6 h-6 text-red-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-3 mb-8">
          <TabButton tab="overview" label="Overview" isActive={activeTab === "overview"} onClick={setActiveTab} />
          <TabButton tab="prices" label="Price Forecasting" isActive={activeTab === "prices"} onClick={setActiveTab} />
          <TabButton
            tab="demand"
            label="Demand Intelligence"
            isActive={activeTab === "demand"}
            onClick={setActiveTab}
          />
          <TabButton
            tab="procurement"
            label="Procurement"
            isActive={activeTab === "procurement"}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Price Trends */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h3
                  className="text-xl font-bold text-white mb-6"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Raw Material Price Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <YAxis stroke="#9CA3AF" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <Tooltip
                      formatter={(value) => [`₹${value}`, ""]}
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="ironOre" stroke="#EF4444" strokeWidth={3} name="Iron Ore" />
                    <Line type="monotone" dataKey="coal" stroke="#F97316" strokeWidth={3} name="Coal" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Regional Demand */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h3
                  className="text-xl font-bold text-white mb-6"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Regional Demand Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="region" stroke="#9CA3AF" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <YAxis stroke="#9CA3AF" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    />
                    <Bar dataKey="demand" fill="#DC2626" name="Demand (MT)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Real-time Alerts
              </h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Price Forecasting Tab */}
        {activeTab === "prices" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                6-Month Price Forecast
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                  <YAxis stroke="#9CA3AF" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, ""]}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="ironOre"
                    stackId="1"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.3}
                    name="Iron Ore"
                  />
                  <Area
                    type="monotone"
                    dataKey="coal"
                    stackId="2"
                    stroke="#F97316"
                    fill="#F97316"
                    fillOpacity={0.3}
                    name="Coal"
                  />
                  <Area
                    type="monotone"
                    dataKey="scrap"
                    stackId="3"
                    stroke="#EAB308"
                    fill="#EAB308"
                    fillOpacity={0.3}
                    name="Scrap Metal"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h4
                  className="font-bold text-white mb-4 text-lg"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Iron Ore Forecast
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      Current Price:
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      ₹13,800/MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      30-day Forecast:
                    </span>
                    <span className="font-semibold text-red-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      ₹14,800/MT (+7%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      Confidence:
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      89%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h4
                  className="font-bold text-white mb-4 text-lg"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Coal Forecast
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      Current Price:
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      ₹9,300/MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      30-day Forecast:
                    </span>
                    <span className="font-semibold text-red-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      ₹9,800/MT (+5%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      Confidence:
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      82%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h4
                  className="font-bold text-white mb-4 text-lg"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Scrap Metal Forecast
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      Current Price:
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      ₹37,800/MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      30-day Forecast:
                    </span>
                    <span className="font-semibold text-red-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      ₹39,200/MT (+4%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      Confidence:
                    </span>
                    <span className="font-semibold text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      76%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demand Intelligence Tab */}
        {activeTab === "demand" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3
                  className="text-lg font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Regional Demand Growth
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <YAxis style={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <Tooltip contentStyle={{ fontFamily: "Inter, system-ui, sans-serif" }} />
                    <Bar dataKey="growth" fill="#82ca9d" name="Growth %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3
                  className="text-lg font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Market Intelligence
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Construction Permits
                      </p>
                      <p className="text-sm text-green-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Chennai region increased 15% this month
                      </p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Infrastructure Projects
                      </p>
                      <p className="text-sm text-blue-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        ₹12,000Cr metro expansion announced
                      </p>
                    </div>
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Seasonal Demand
                      </p>
                      <p className="text-sm text-yellow-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Pre-monsoon demand spike expected
                      </p>
                    </div>
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3
                className="text-lg font-semibold text-gray-800 mb-4"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Demand Forecast Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p
                    className="text-2xl font-bold text-gray-800"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    2,720 MT
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                    Total Monthly Demand
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p
                    className="text-2xl font-bold text-green-600"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    +14%
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                    YoY Growth
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p
                    className="text-2xl font-bold text-blue-600"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    85%
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                    Forecast Accuracy
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p
                    className="text-2xl font-bold text-purple-600"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    Chennai
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                    Top Growth Region
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Procurement Tab */}
        {activeTab === "procurement" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3
                className="text-lg font-semibold text-gray-800 mb-4"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                AI Procurement Recommendations
              </h3>
              <div className="space-y-4">
                {procurementRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4
                          className="font-medium text-gray-800"
                          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                          {rec.material}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            rec.action === "BUY NOW"
                              ? "bg-green-100 text-green-800"
                              : rec.action === "WAIT"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                          {rec.action}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        {rec.reason}
                      </p>
                      <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Quantity: {rec.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Confidence
                      </p>
                      <p className="font-semibold text-lg" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        {rec.confidence}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3
                className="text-lg font-semibold text-gray-800 mb-4"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Supplier Performance Scorecard
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Supplier
                      </th>
                      <th className="text-left py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Overall Score
                      </th>
                      <th className="text-left py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Cost Rating
                      </th>
                      <th className="text-left py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Quality
                      </th>
                      <th className="text-left py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        Delivery
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierData.map((supplier, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                          {supplier.name}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="font-semibold mr-2" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                              {supplier.score}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${supplier.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              supplier.cost === "Low"
                                ? "bg-green-100 text-green-800"
                                : supplier.cost === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                          >
                            {supplier.cost}
                          </span>
                        </td>
                        <td className="py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                          {supplier.quality}
                        </td>
                        <td className="py-3 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                          {supplier.delivery}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Watermark */}
      <div className="border-t border-gray-800 bg-black/50 backdrop-blur-sm mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Built by <span className="font-semibold text-red-400">Kshitiz</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
